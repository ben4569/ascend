import os

import resend
from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
EMAIL_FROM = os.getenv("EMAIL_FROM")
APP_BASE_URL = os.getenv("APP_BASE_URL", "http://localhost:5174")

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


def send_verification_email(email: str, token: str) -> None:
    if not RESEND_API_KEY:
        raise RuntimeError("RESEND_API_KEY is not configured")

    if not EMAIL_FROM:
        raise RuntimeError("EMAIL_FROM is not configured")

    verification_url = (
        f"{APP_BASE_URL}/verify-email?token={token}"
    )

    params = {
        "from": EMAIL_FROM,
        "to": [email],
        "subject": "Verify your ASCND email",
        "html": f"""
        <!DOCTYPE html>
        <html>
        <body style="
            margin: 0;
            padding: 40px 20px;
            background: #030712;
            color: #f8fafc;
            font-family: Arial, sans-serif;
        ">
            <div style="
                max-width: 520px;
                margin: 0 auto;
                padding: 40px;
                background: #0f172a;
                border: 1px solid #1e293b;
                border-radius: 16px;
            ">
                <h1 style="margin-top: 0;">
                    Verify your ASCND account
                </h1>

                <p style="color: #94a3b8; line-height: 1.6;">
                    You're one step away from starting your ascension.
                    Confirm your email address to continue.
                </p>

                <p style="margin: 32px 0;">
                    <a
                        href="{verification_url}"
                        style="
                            display: inline-block;
                            padding: 14px 22px;
                            background: #38bdf8;
                            color: #020617;
                            text-decoration: none;
                            font-weight: 700;
                            border-radius: 10px;
                        "
                    >
                        Verify my email
                    </a>
                </p>

                <p style="
                    color: #64748b;
                    font-size: 13px;
                    line-height: 1.5;
                ">
                    This verification link expires in 30 minutes.
                    If you didn't create an ASCND account, you can
                    safely ignore this email.
                </p>
            </div>
        </body>
        </html>
        """,
    }

    resend.Emails.send(params)