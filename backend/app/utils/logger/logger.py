import logging

import os
import logging

LOG_LEVEL = os.environ.get('LOG_LEVEL', logging.DEBUG)
LOG_FORMAT = os.environ.get('LOG_FORMAT', "[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)

# Create a formatter
formatter = logging.Formatter(LOG_FORMAT)

# Create a console handler and set the level
console_handler = logging.StreamHandler()
console_handler.setLevel(LOG_LEVEL)
console_handler.setFormatter(formatter)

# Add the handlers to the logger
logger.addHandler(console_handler)


def log(level, log_message):
    if level in logging._nameToLevel:
        logger.log(logging._nameToLevel[level], log_message)
        print(log_message)
    else:
        raise ValueError("Invalid log level")
