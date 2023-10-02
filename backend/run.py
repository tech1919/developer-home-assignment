from flask import Flask
import os
from app.routes import init_routes
from app.utils.jwt.jwt import jwt
from dotenv import load_dotenv
from app.models import init_db
from flask_cors import CORS

# Load variables from a .env file
load_dotenv()

def create_app():
    db_uri = os.environ.get("DATABASE_URI", None)
    DEBUG = os.environ.get("DEBUG", False)
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", None)
    SECRET_KEY = os.environ.get("SECRET_KEY", None)

    if db_uri == "":
        raise Exception("DATABASE_URI environment variable must be set in the .env file")    

    # Initialize api
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
    app.config["SECRET_KEY"] = SECRET_KEY
    app.config["WTF_CSRF_ENABLED"] = False
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 86400
    
    app = init_db(app)
    app = init_routes(app)

    jwt.init_app(app)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
