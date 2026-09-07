import logging


def configure_logging(app):
    if app.debug:
        logging.basicConfig(
            level=logging.DEBUG
        )
    else:
        logging.basicConfig(
            level=logging.INFO
        )

    app.logger.setLevel(
        logging.DEBUG if app.debug else logging.INFO
    )