import hashlib
import os
import re
from datetime import datetime, timedelta, timezone

from flask import (
    Blueprint,
    jsonify,
    redirect,
    request,
    session,
)

from authlib.integrations.flask_client import OAuth

from database.db import db_cursor
from services.email import send_verification_email
from utils.passwords import hash_password, verify_password
from utils.tokens import generate_verification_token


auth_bp = Blueprint("auth", __name__)

oauth = OAuth()

oauth.register(
    name="google",
    server_metadata_url=(
        "https://accounts.google.com/.well-known/openid-configuration"
    ),
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
)


EMAIL_PATTERN = re.compile(
    r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
)


def validate_password(password: str) -> str | None:
    if len(password) < 8:
        return "Password must be at least 8 characters"

    if re.search(r"\s", password):
        return "Spaces aren't allowed"

    if not re.search(r"[A-Z]", password):
        return "Add an uppercase letter"

    if not re.search(r"\d", password):
        return "Add a number"

    if not re.search(
        r"""[!@#$%^&*(),.?":{}|<>\_\-\\[\]/;'`~+=]""",
        password,
    ):
        return "Add a special character"

    return None


# ============================================================
# EMAIL / PASSWORD SIGNUP
# ============================================================

@auth_bp.post("/signup")
def signup():
    data = request.get_json(silent=True) or {}

    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")

    if not isinstance(password, str):
        password = ""

    # Validate email
    if not email or not EMAIL_PATTERN.fullmatch(email):
        return jsonify({
            "error": "Enter a valid email address"
        }), 400

    # Validate password
    password_error = validate_password(password)

    if password_error:
        return jsonify({
            "error": password_error
        }), 400

    password_hash = hash_password(password)

    # Temporary username.
    # We will improve username generation later.
    username = email.split("@", 1)[0][:50]

    try:
        with db_cursor() as cursor:

            # Check whether this email already exists
            cursor.execute(
                """
                SELECT id, email_verified
                FROM users
                WHERE LOWER(email) = %s
                """,
                (email,),
            )

            existing_user = cursor.fetchone()

            if existing_user:

                # Account exists but hasn't verified email
                if not existing_user["email_verified"]:
                    return jsonify({
                        "error": (
                            "An account already exists with this email "
                            "and is waiting for verification."
                        )
                    }), 409

                # Fully verified account already exists
                return jsonify({
                    "error": "An account with this email already exists"
                }), 409

            # Create unverified account
            cursor.execute(
                """
                INSERT INTO users (
                    username,
                    email,
                    password_hash,
                    email_verified
                )
                VALUES (%s, %s, %s, FALSE)
                RETURNING id
                """,
                (
                    username,
                    email,
                    password_hash,
                ),
            )

            user = cursor.fetchone()

            # Generate secure verification token
            token, token_hash = generate_verification_token()

            # Token expires in 30 minutes
            expires_at = (
                datetime.now(timezone.utc)
                + timedelta(minutes=30)
            )

            # Store ONLY the hash in the database
            cursor.execute(
                """
                INSERT INTO email_verification_tokens (
                    user_id,
                    token_hash,
                    expires_at
                )
                VALUES (%s, %s, %s)
                """,
                (
                    user["id"],
                    token_hash,
                    expires_at,
                ),
            )

        # Send email after successful database transaction
        send_verification_email(
            email=email,
            token=token,
        )

        # Do NOT authenticate the user yet.
        session.clear()

        return jsonify({
            "message": (
                "Account created. "
                "Check your email to verify your account."
            ),
            "user": {
                "id": user["id"],
                "email": email,
                "email_verified": False,
            },
        }), 201

    except Exception:
        raise


# ============================================================
# EMAIL VERIFICATION
# ============================================================

@auth_bp.get("/verify-email")
def verify_email():
    token = request.args.get("token", "").strip()

    if not token:
        return redirect(
            "http://localhost:5174/verify-email?status=invalid"
        )

    # Hash token received from email
    token_hash = hashlib.sha256(
        token.encode("utf-8")
    ).hexdigest()

    with db_cursor() as cursor:

        cursor.execute(
            """
            SELECT
                id,
                user_id,
                expires_at,
                used_at
            FROM email_verification_tokens
            WHERE token_hash = %s
            """,
            (token_hash,),
        )

        verification = cursor.fetchone()

        # Token doesn't exist
        if not verification:
            return redirect(
                "http://localhost:5174/verify-email?status=invalid"
            )

        # Token was already used
        if verification["used_at"] is not None:
            return redirect(
                "http://localhost:5174/verify-email?status=used"
            )

        # Token expired
        if verification["expires_at"] <= datetime.now(timezone.utc):
            return redirect(
                "http://localhost:5174/verify-email?status=expired"
            )

        # Verify user's email
        cursor.execute(
            """
            UPDATE users
            SET
                email_verified = TRUE,
                updated_at = NOW()
            WHERE id = %s
            """,
            (verification["user_id"],),
        )

        # Mark token as consumed
        cursor.execute(
            """
            UPDATE email_verification_tokens
            SET used_at = NOW()
            WHERE id = %s
            """,
            (verification["id"],),
        )

        user_id = verification["user_id"]

    # User is now authenticated
    session.clear()
    session["user_id"] = user_id

    return redirect(
        "http://localhost:5174/onboarding"
    )


# ============================================================
# EMAIL / PASSWORD LOGIN
# ============================================================

@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}

    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")

    if not isinstance(password, str):
        password = ""

    if not email or not password:
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    with db_cursor() as cursor:

        cursor.execute(
            """
            SELECT
                id,
                email,
                password_hash,
                email_verified
            FROM users
            WHERE LOWER(email) = %s
            """,
            (email,),
        )

        user = cursor.fetchone()

    # Invalid credentials
    if not user or not user["password_hash"]:
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    # Verify password
    if not verify_password(
        password,
        user["password_hash"],
    ):
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    # Don't allow unverified email/password accounts into the app
    if not user["email_verified"]:
        return jsonify({
            "error": (
                "Please verify your email before logging in."
            ),
            "email_verified": False,
        }), 403

    # Successful login
    session.clear()
    session["user_id"] = user["id"]

    return jsonify({
        "message": "Logged in",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "email_verified": True,
        },
    })


# ============================================================
# LOGOUT
# ============================================================

@auth_bp.post("/logout")
def logout():
    session.clear()

    return jsonify({
        "message": "Logged out"
    })


# ============================================================
# CURRENT USER
# ============================================================

@auth_bp.get("/me")
def me():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "authenticated": False
        })

    with db_cursor() as cursor:

        cursor.execute(
            """
            SELECT
                id,
                email,
                username,
                email_verified
            FROM users
            WHERE id = %s
            """,
            (user_id,),
        )

        user = cursor.fetchone()

    if not user:
        session.clear()

        return jsonify({
            "authenticated": False
        })

    return jsonify({
        "authenticated": True,
        "user": {
            "id": user["id"],
            "email": user["email"],
            "username": user["username"],
            "email_verified": user["email_verified"],
        },
    })


# ============================================================
# GOOGLE LOGIN
# ============================================================

@auth_bp.get("/google")
def google_login():
    redirect_uri = (
        "http://localhost:5000/auth/google/callback"
    )

    return oauth.google.authorize_redirect(
        redirect_uri
    )


# ============================================================
# GOOGLE CALLBACK
# ============================================================

@auth_bp.get("/google/callback")
def google_callback():
    token = oauth.google.authorize_access_token()

    userinfo = token["userinfo"]

    google_sub = userinfo["sub"]
    email = userinfo.get("email")

    if not email:
        return jsonify({
            "error": (
                "Google account did not provide "
                "an email address"
            )
        }), 400

    email = email.strip().lower()

    with db_cursor() as cursor:

        # Check whether this Google identity
        # is already connected to an ASCND account.
        cursor.execute(
            """
            SELECT user_id
            FROM auth_identities
            WHERE provider = %s
              AND provider_user_id = %s
            """,
            (
                "google",
                google_sub,
            ),
        )

        identity = cursor.fetchone()

        if identity:
            user_id = identity["user_id"]

        else:

            # Do NOT automatically link Google to an
            # existing password account based only on email.
            cursor.execute(
                """
                SELECT id
                FROM users
                WHERE LOWER(email) = %s
                """,
                (email,),
            )

            existing_user = cursor.fetchone()

            if existing_user:
                return jsonify({
                    "error": (
                        "An account with this email already exists. "
                        "Log in with your password first, then link Google."
                    )
                }), 409

            username = email.split("@", 1)[0][:50]

            # Google-authenticated account.
            # No password is stored.
            # Google identity is considered verified.
            cursor.execute(
                """
                INSERT INTO users (
                    username,
                    email,
                    password_hash,
                    email_verified
                )
                VALUES (%s, %s, NULL, TRUE)
                RETURNING id
                """,
                (
                    username,
                    email,
                ),
            )

            user = cursor.fetchone()
            user_id = user["id"]

            # Store Google's stable subject identifier
            cursor.execute(
                """
                INSERT INTO auth_identities (
                    user_id,
                    provider,
                    provider_user_id
                )
                VALUES (%s, %s, %s)
                """,
                (
                    user_id,
                    "google",
                    google_sub,
                ),
            )

    # Authenticate Google user
    session.clear()
    session["user_id"] = user_id

    # We'll change this to the actual onboarding
    # route once that frontend route exists.
    return redirect(
        "http://localhost:5174/onboarding"
    )