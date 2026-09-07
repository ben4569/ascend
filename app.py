from flask import Flask, render_template

from config import Config
from database.db import init_db
from utils.logging_config import configure_logging


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    configure_logging(app)

    @app.get("/")
    def index():
        return render_template("index.html")

    @app.get("/health")
    def health():
        return {
            "status": "ok",
            "service": "ascend"
        }

    @app.errorhandler(404)
    def not_found(error):
        return render_template("errors/404.html"), 404

    @app.errorhandler(500)
    def internal_error(error):
        app.logger.exception("Unhandled application error")
        return render_template("errors/500.html"), 500

    if app.config["AUTO_INIT_DB"]:
        init_db()

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=app.config["DEBUG"]
    )