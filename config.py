import os

from dotenv import load_dotenv


load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY") or os.getenv("SESSION_SECRET")
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = False
    SESSION_COOKIE_PATH = "/"
    if not SECRET_KEY:
        raise RuntimeError(
            "SECRET_KEY or SESSION_SECRET environment variable is required."
        )

    DATABASE_URL = os.getenv("DATABASE_URL")

    if not DATABASE_URL:
        raise RuntimeError(
            "DATABASE_URL environment variable is required."
        )
    GOOGLE_CLIENT_ID: os.getenv("570003592543-duq7dm5grul82mthfc19f01a1qqoavtp.apps.googleusercontent.com")
    GOOGLE_CLIENT_SECRET : os.getenv("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")

    DEBUG = os.getenv("DEBUG", "0") == "1"

    HOST = os.getenv(
        "HOST",
        "0.0.0.0"
    )

    PORT = int(
        os.getenv(
            "PORT",
            "5000"
        )
    )

    AUTO_INIT_DB = os.getenv(
        "AUTO_INIT_DB",
        "0"
    ) == "1"

    SESSION_COOKIE_HTTPONLY = True

    SESSION_COOKIE_SAMESITE = "Lax"

    SESSION_COOKIE_SECURE = (
        os.getenv("SESSION_COOKIE_SECURE", "0") == "1"
    )

    MAX_CONTENT_LENGTH = 2 * 1024 * 1024