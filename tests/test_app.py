import os


os.environ["SECRET_KEY"] = "test-secret-key"

os.environ["DATABASE_URL"] = (
    "postgresql://postgres:password@localhost:5432/ascend"
)

os.environ["AUTO_INIT_DB"] = "0"


from app import create_app


def test_home_page():
    app = create_app()

    app.config["TESTING"] = True

    client = app.test_client()

    response = client.get("/")

    assert response.status_code == 200

    assert b'<div id="root"></div>' in response.data


def test_health_endpoint():
    app = create_app()

    app.config["TESTING"] = True

    client = app.test_client()

    response = client.get("/health")

    assert response.status_code == 200

    assert response.json["status"] == "ok"


def test_404_page():
    app = create_app()

    app.config["TESTING"] = True

    client = app.test_client()

    response = client.get(
        "/this-page-does-not-exist"
    )

    assert response.status_code == 404