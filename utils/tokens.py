import hashlib
import secrets


def generate_verification_token() -> tuple[str, str]:
    token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(
        token.encode("utf-8")
    ).hexdigest()

    return token, token_hash