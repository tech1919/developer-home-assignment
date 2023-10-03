import os
from dotenv import load_dotenv
import uvicorn
import logging

load_dotenv() # load configuration
logging.basicConfig(level=logging.INFO) # writing messages into logs


if __name__ == "__main__":
    server_port = int(os.environ.get("APP_SERVER_PORT", 5000))
    server_log_level = os.environ.get("APP_LOG_LEVEL").lower()
    uvicorn.run("app.main:app", port= server_port, log_level= server_log_level)