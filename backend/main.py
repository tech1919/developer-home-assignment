from flask import Flask, request
from mysql.connector import connection

# from  myconnection import

app = Flask("__name_")


@app.route("/")
def index():
    cnx = connection.MySQLConnection(
        user="root", password="pwd", host="127.0.0.1", database="myDB"
    )
    print("connected")
    cnx.close()

    return "<h1>connected</h1>"


# Retrieve a list of all tasks
@app.route("/tasks", methods=["GET"])
def home():
    cnx = connection.MySQLConnection(
        user="root", password="pwd", host="127.0.0.1", database="myDB"
    )
    cursor = cnx.cursor()
    query = "SELECT * FROM tasks"
    cursor.execute(query)

    results = cursor.fetchall()

    print(results)
    cursor.close()
    cnx.close()
    return f"<h1>{results}</h1>"


# Retrieve details of a specific task by its ID
@app.route("/tasks/<id>", methods=["GET"])
def get_task(id):
    cnx = connection.MySQLConnection(
        user="root", password="pwd", host="127.0.0.1", database="myDB"
    )
    cursor = cnx.cursor()
    query = f"SELECT * FROM tasks WHERE id ={id}"
    cursor.execute(query)
    results = cursor.fetchall()
    print(results)
    cursor.close()
    cnx.close()

    return f"<h1>{results}</h1>"

# Create a new task
@app.route("/tasks", methods=["POST"])
def create_task():
    title = request.json["task"]
    description = request.json["description"]
    completed = request.json["completed"]
    print("task", title, description, completed)
    cnx = connection.MySQLConnection(
        user="root", password="pwd", host="127.0.0.1", database="myDB"
    )
    cursor = cnx.cursor()
    query = f"INSERT INTO tasks (title, description, completed) VALUES ('{title}', '{description}', {completed});"

    cursor.execute(query)
    cnx.commit()
    cursor.close()
    cnx.close()

    return "new record added!"

#Update an existing task by its ID
@app.route("/tasks/<id>", methods=["PUT"])
def update_task(id):
    task = request.get_json()
    update_query=''
    for key in task:
        if isinstance(task[key],bool): 
            update_query += f"{key} = {task[key]}, "
        else:    
            update_query += f"{key} = '{task[key]}', "
    update_query = update_query.rstrip(', ')

    print(update_query)

    
    cnx = connection.MySQLConnection(user='root', password='pwd',
        host='127.0.0.1',
        database='myDB')
    cursor=cnx.cursor()
    query =f"UPDATE tasks SET {update_query} WHERE id = {id}"
    print(query)
    cursor.execute(query)
    cnx.commit()

    new_record = cursor.fetchone()
    print(new_record)

    cursor.close()
    cnx.close()
    return f"{id} updated!!!"

#Delete a task by its ID
@app.route("/tasks/<id>", methods=["DELETE"])
def delete_task(id):
    cnx = connection.MySQLConnection(
        user="root", password="pwd", host="127.0.0.1", database="myDB"
    )
    cursor = cnx.cursor()
    query = f"DELETE FROM tasks WHERE id ={id}"
    cursor.execute(query)
    cnx.commit()

    cursor.close()
    cnx.close()
    
    return f"task {id} deleted!!!"


if "__name__" == "__main__":
    app.run(host="0.0.0.0")
