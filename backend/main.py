import os
from flask import Flask, request, jsonify
from db import Database
from model import Task
import mysql.connector
app = Flask(__name__)
db_pool = Database(pool_size=5)
db_pool.create_table_if_not_exists()
import config

# Helper function to handle database errors
def handle_database_error(error_message):
    return jsonify({"error": error_message}), 500

# GET /tasks
@app.route('/', methods=['GET'])
@app.route('/tasks', methods=['GET'])
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
@app.route('/tasks/<int:id>', methods=['GET'])
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
@app.route('/tasks', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        new_task = Task(data["title"], data["description"], data["completed"])

        connection = db_pool.get_connection()
        cursor = connection.cursor()
        cursor.execute("INSERT INTO tasks (title, description, completed) VALUES (%s, %s, %s)",
                       (new_task.title, new_task.description, new_task.completed))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Task created successfully"}), 201
    except mysql.connector.Error as e:
        return handle_database_error(str(e))

# PUT /tasks/{id}
@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    try:
        data = request.get_json()

        connection = db_pool.get_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id=%s", (id,))
        existing_task = cursor.fetchone()

        if existing_task:
            updated_task = Task(data["title"], data["description"], data["completed"])
            cursor.execute("UPDATE tasks SET title=%s, description=%s, completed=%s WHERE id=%s",
                           (updated_task.title, updated_task.description, updated_task.completed, id))
            connection.commit()
            cursor.close()
            connection.close()
            return jsonify({"message": "Task updated successfully"})
        else:
            return jsonify({"message": "Task not found"}), 404
    except mysql.connector.Error as e:
        return handle_database_error(str(e))

# DELETE /tasks/{id}
@app.route('/tasks/<int:id>', methods=['DELETE'])
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
    app.run(debug=True)
