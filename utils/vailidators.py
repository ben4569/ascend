import re


EMAIL_PATTERN = re.compile(
    r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
)


USERNAME_PATTERN = re.compile(
    r"^[A-Za-z0-9_]{3,50}$"
)


def validate_email(email):
    if not email:
        return False

    return bool(
        EMAIL_PATTERN.match(
            email.strip()
        )
    )


def validate_username(username):
    if not username:
        return False

    return bool(
        USERNAME_PATTERN.match(
            username.strip()
        )
    )


def validate_password(password):
    if not password:
        return False

    return len(password) >= 8