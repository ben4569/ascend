from pathlib import Path

from flask import Flask, render_template, send_from_directory

from config import Config
from database.db import init_db
from utils.logging_config import configure_logging


FRONTEND_DIST = Path(__file__).resolve().parent / "frontend" / "dist"


def create_app():
    app = Flask(
        __name__,
        static_folder=str(FRONTEND_DIST / "assets"),
        static_url_path="/assets",
        template_folder=str(FRONTEND_DIST),
    )
    app.config.from_object(Config)

    configure_logging(app)

    @app.get("/")
    @app.get("/signup")
    def index():
        return render_template("index.html")
    @app.get("/health")
    def health():
        return {
            "status": "ok",
            "service": "ascend"
        }

    @app.get("/favicon.ico")
    def favicon():
        return "", 204

    @app.get("/favicon.svg")
    def favicon_svg():
        return send_from_directory(FRONTEND_DIST, "favicon.svg")

    @app.get("/icons.svg")
    def icons_svg():
        return send_from_directory(FRONTEND_DIST, "icons.svg")

    @app.errorhandler(404)
    def not_found(error):
        return {"error": "not_found"}, 404

    @app.errorhandler(500)
    def internal_error(error):
        app.logger.exception("Unhandled application error")
        return {"error": "internal_server_error"}, 500

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