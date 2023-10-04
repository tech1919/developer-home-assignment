import os
from dotenv import dotenv_values
# Define the configuration variables
env_vars=dotenv_values()

print(env_vars["URL_PREFIX"])
class Config:
    HOST = env_vars['HOST']
    PORT = int(env_vars['PORT'])
    VERSION = env_vars['VERSION']
    URL_PREFIX = env_vars['URL_PREFIX']
    DEFAULT_DEBUG = env_vars['DEFAULT_DEBUG']
    THREADS_PER_PAGE = int(env_vars['THREADS_PER_PAGE'])
    CSRF_ENABLED = env_vars['CSRF_ENABLED']
    CSRF_SESSION_KEY = env_vars['CSRF_SESSION_KEY']

    ENV = 'development'
    CONNECT_TIMEOUT = 5

    if ENV == 'development':
    # Development environment
        DEBUG = True
        DEVELOPMENT = True
        DATABASE = env_vars['DEVELOPMENT_DATABASE']
        DB_HOST = env_vars['DEVELOPMENT_DB_HOST']
        DB_PORT =env_vars['DEVELOPMENT_DB_PORT']
        DB_USER = str(env_vars['DEVELOPMENT_DB_USER'])
        DB_PASSWD = env_vars['DEVELOPMENT_DB_PASSWD']
        DB_NAME = env_vars['DEVELOPMENT_DB_NAME']
        SECRET_KEY = env_vars['DEVELOPMENT_SECRET_KEY']
    else:
    # Production environment
        DEBUG = False
        DEVELOPMENT = False
        DATABASE = env_vars['PRODUCTION_DATABASE']
        DB_HOST = env_vars['PRODUCTION_DB_HOST']
        DB_PORT = env_vars['PRODUCTION_DB_PORT']
        DB_USER = env_vars['PRODUCTION_DB_USER']
        DB_PASSWD = env_vars['PRODUCTION_DB_PASSWD']
        DB_NAME = env_vars['PRODUCTION_DB_NAME']
        SECRET_KEY = env_vars['PRODUCTION_SECRET_KEY']

    # Export the configuration object
config = Config()
