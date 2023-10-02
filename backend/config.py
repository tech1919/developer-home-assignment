import os

# Define the configuration variables

HOST = os.environ.get('HOST')
PORT = int(os.environ.get('PORT'))
VERSION = os.environ.get('VERSION')
URL_PREFIX = os.environ.get('URL_PREFIX')
DEFAULT_DEBUG = os.environ.get('DEFAULT_DEBUG')
THREADS_PER_PAGE = int(os.environ.get('THREADS_PER_PAGE'))
CSRF_ENABLED = os.environ.get('CSRF_ENABLED')
CSRF_SESSION_KEY = os.environ.get('CSRF_SESSION_KEY')

ENV = 'development'
CONNECT_TIMEOUT = 5

if ENV == 'development':
# Development environment
    DEBUG = True
    DEVELOPMENT = True
    DATABASE = os.environ.get('DEVELOPMENT_DATABASE')
    DB_HOST = os.environ.get('DEVELOPMENT_DB_HOST')
    DB_PORT =os.environ.get('DEVELOPMENT_DB_PORT')
    DB_USER = str(os.environ.get('DEVELOPMENT_DB_USER'))
    DB_PASSWD = os.environ.get('DEVELOPMENT_DB_PASSWD')
    DB_NAME = os.environ.get('DEVELOPMENT_DB_NAME')
    SECRET_KEY = os.environ.get('DEVELOPMENT_SECRET_KEY')
else:
# Production environment
    DEBUG = False
    DEVELOPMENT = False
    DATABASE = os.environ.get('PRODUCTION_DATABASE')
    DB_HOST = os.environ.get('PRODUCTION_DB_HOST')
    DB_PORT = os.environ.get('PRODUCTION_DB_PORT')
    DB_USER = os.environ.get('PRODUCTION_DB_USER')
    DB_PASSWD = os.environ.get('PRODUCTION_DB_PASSWD')
    DB_NAME = os.environ.get('PRODUCTION_DB_NAME')
    SECRET_KEY = os.environ.get('PRODUCTION_SECRET_KEY')

# Export the configuration object
# config = Config()
