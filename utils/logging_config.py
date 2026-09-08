import logging


def configure_logging(app):
    """Configure consistent application logging for development and production."""
    log_level = logging.DEBUG if app.config.get("DEBUG") else logging.INFO

    logging.basicConfig(
        level=log_level,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )

    app.logger.setLevel(log_level)