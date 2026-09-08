from database.db import db_cursor


def check_database_health():
    try:
        with db_cursor() as cursor:
            cursor.execute("SELECT 1 AS ok")

            result = cursor.fetchone()

        return result["ok"] == 1

    except Exception:
        return False