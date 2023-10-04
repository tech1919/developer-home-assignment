import logging
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from db import Database
from model import Task
from config import config
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
db_pool = Database(pool_size=5)
db_pool.create_table_if_not_exists()

# logger = logging.getLogger('flask_cors')
# logger.setLevel(logging.DEBUG)
# formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")

# # Log to console
# handler = logging.StreamHandler()
# handler.setFormatter(formatter)
# logger.addHandler(handler)

# # Also log to a file
# file_handler = logging.FileHandler("cpy-errors.log")
# file_handler.setFormatter(formatter)
# logger.addHandler(file_handler) 

def handle_database_error(error_message):
    return jsonify({"error": error_message}), 500

# GET /tasks
@app.route(f'/{config.URL_PREFIX}/', methods=['GET'])
@app.route(f'/{config.URL_PREFIX}/tasks', methods=['GET'])
def get_tasks():
    try:
        connection = db_pool.get_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM tasks")
        tasks = cursor.fetchall()
        cursor.close()
        connection.close()

        task_list = []
        for task in tasks:
            task_data = Task(*task[1:]).as_dict()
            task_data["id"] = task[0]
            task_list.append(task_data)
            
        return jsonify(task_list)
    except mysql.connector.Error as e:
        return handle_database_error(str(e))

# GET /tasks/{id}
@app.route(f'/{config.URL_PREFIX}/tasks/<int:id>', methods=['GET'])
def get_task(id):
    try:
        connection = db_pool.get_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id=%s", (id,))
        task = cursor.fetchone()
        cursor.close()
        connection.close()

        if task:
            task_data = Task(*task[1:]).as_dict()
            task_data["id"] = task[0]
            return jsonify(task_data)
        else:
            return jsonify({"message": "Task not found"}), 404
    except mysql.connector.Error as e:
        return handle_database_error(str(e))

# POST /tasks
@app.route(f'/{config.URL_PREFIX}/tasks', methods=['POST'])
@cross_origin()
def create_task():
    try:
        data = request.get_json()["task"]
        new_task = Task(data["title"], data["description"], False)

        connection = db_pool.get_connection()
        cursor = connection.cursor()
        cursor.execute("INSERT INTO tasks (title, description, completed) VALUES (%s, %s, False)",
                       (new_task.title, new_task.description))
        connection.commit()
        cursor.close()
        connection.close()
        print("Task created successfully")
        return jsonify({"message": "Task created successfully"}), 201
    except mysql.connector.Error as e:
        return handle_database_error(str(e))

# PUT /tasks/{id}
@app.route(f'/{config.URL_PREFIX}/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    try:
        data = request.get_json()["task"]
        # task = request.get_json()
        update_query=''
        for key in data:
            if isinstance(data[key],bool): 
                update_query += f"{key} = {data[key]}, "
            else:    
                update_query += f"{key} = '{data[key]}', "
        update_query = update_query.rstrip(', ')
        connection = db_pool.get_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id=%s", (id,))
        existing_task = cursor.fetchone()

        if existing_task:
            cursor.execute(f"UPDATE tasks SET {update_query} WHERE id={id}")
            connection.commit()
            cursor.close()
            connection.close()
            return jsonify({"message": "Task updated successfully"})
        else:
            return jsonify({"message": "Task not found"}), 404
    except mysql.connector.Error as e:
        return handle_database_error(str(e))

# DELETE /tasks/{id}
@app.route(f'/{config.URL_PREFIX}/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    try:
        connection = db_pool.get_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id=%s", (id,))
        existing_task = cursor.fetchone()

        if existing_task:
            cursor.execute("DELETE FROM tasks WHERE id=%s", (id,))
            connection.commit()
            cursor.close()
            connection.close()
            return jsonify({"message": "Task deleted successfully"})
        else:
            return jsonify({"message": "Task not found"}), 404
    except mysql.connector.Error as e:
        return handle_database_error(str(e))

if __name__ == '__main__':
    app.run(host="127.0.0.1",debug=True, port=8080, load_dotenv=True)
