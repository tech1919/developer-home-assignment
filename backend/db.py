import mysql.connector
import mysql.connector.pooling
import time
from config import config

class Database:
    def __init__(self, pool_size, max_retries=3, retry_delay=1):
        self.pool_size = pool_size
        self.max_retries = max_retries
        self.retry_delay = retry_delay

        self.connection_pool = mysql.connector.pooling.MySQLConnectionPool(
            pool_size=pool_size,
            host=config.HOST,
            user=config.DB_USER,
            password=config.DB_PASSWD,
            database=config.DB_NAME,
            connect_timeout=config.CONNECT_TIMEOUT

        )

        self.retries = 0

    def get_connection(self):
        connection = None
        while self.retries < self.max_retries:
            try:
                connection = self.connection_pool.get_connection()
                if connection:
                    return connection
            except mysql.connector.Error as err:
                self.retries += 1
                print(f"Connection attempt failed. Retrying... (Attempt {self.retries}/{self.max_retries})")
                time.sleep(self.retry_delay)

        raise Exception("Max connection attempts reached. Unable to establish a connection.")

    def create_table_if_not_exists(self):
        try:
            connection = self.get_connection()
            cursor = connection.cursor()
            create_table_query = """
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                description TEXT,
                completed BOOLEAN
            )
            """
            cursor.execute(create_table_query)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print("Error: {}".format(err))

    def close_pool(self):
        self.connection_pool.closeall()
