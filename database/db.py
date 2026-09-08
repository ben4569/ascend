import os
from contextlib import contextmanager
from pathlib import Path

import psycopg2
from psycopg2 import pool
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv


load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL environment variable is required."
    )


_connection_pool = None


def _get_connection_pool():
    global _connection_pool

    if _connection_pool is None:
        _connection_pool = pool.ThreadedConnectionPool(
            minconn=1,
            maxconn=10,
            dsn=DATABASE_URL
        )

    return _connection_pool


class PooledConnection:
    def __init__(self, connection):
        self.connection = connection

    def cursor(self):
        return self.connection.cursor(
            cursor_factory=RealDictCursor
        )

    def commit(self):
        self.connection.commit()

    def rollback(self):
        self.connection.rollback()

    def close(self):
        if self.connection:
            _get_connection_pool().putconn(self.connection)
            self.connection = None

    def __getattr__(self, name):
        return getattr(self.connection, name)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type:
            self.rollback()

        self.close()


def get_db():
    connection = _get_connection_pool().getconn()

    return PooledConnection(connection)


@contextmanager
def db_cursor():
    db = get_db()

    cursor = None

    try:
        cursor = db.cursor()

        yield cursor

        db.commit()

    except Exception:
        db.rollback()
        raise

    finally:
        if cursor:
            cursor.close()

        db.close()


def init_db():
    schema_path = Path(__file__).with_name("schema.sql")

    schema = schema_path.read_text(
        encoding="utf-8"
    )

    db = get_db()

    try:
        with db.cursor() as cursor:
            cursor.execute(schema)

        db.commit()

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()