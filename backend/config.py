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

    ENV = 'development'
    CONNECT_TIMEOUT = 5

    DEBUG = True
    DEVELOPMENT = True
    DATABASE = env_vars['DEVELOPMENT_DATABASE']
    DB_HOST = env_vars['DEVELOPMENT_DB_HOST']
    DB_PORT =env_vars['DEVELOPMENT_DB_PORT']
    DB_USER = str(env_vars['DEVELOPMENT_DB_USER'])
    DB_PASSWD = env_vars['DEVELOPMENT_DB_PASSWD']
    DB_NAME = env_vars['DEVELOPMENT_DB_NAME']

config = Config()
