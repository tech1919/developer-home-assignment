from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.models.task import Task
from app.models.group import Group
from app.models.db import db
from app.utils.route_helpers import create_response
from flask_jwt_extended import get_jwt_identity

tasks_bp = Blueprint("tasks", __name__, url_prefix="/api")

def _get_user_tasks_sorted(user_email, sort_by="title", order="asc"):
    # Define a mapping for sorting options
    sort_options = {
        "title": {
            "asc": Task.title.asc(),
            "desc": Task.title.desc()
        },
        "description": {
            "asc": Task.description.asc(),
            "desc": Task.description.desc()
        },
        "completed": {
            "asc": Task.completed.asc(),
            "desc": Task.completed.desc()
        }
    }
    
    # Validate sort_by and order
    if sort_by not in sort_options or order not in ["asc", "desc"]:
        return []

    primary_sort = sort_options[sort_by][order]
    secondary_sort = sort_options["title"]["asc"] if sort_by != "title" else None

    # Build the query
    query = Task.query.filter_by(owner=user_email)
    
    if secondary_sort is not None:
        tasks = query.order_by(primary_sort, secondary_sort).all()
    else:
        tasks = query.order_by(primary_sort).all()

    return tasks



# Get all tasks that belong to the user
@tasks_bp.route("/", methods=["GET"], defaults={"sort_by": "title", "order": "asc"})
@jwt_required()
def get_all_tasks(sort_by, order):
    user_email = get_jwt_identity()

    sort_by = request.args.get("sort_by", "title")
    order = request.args.get("order", "asc")

    tasks = _get_user_tasks_sorted(user_email, sort_by, order)
    return create_response(
        "All tasks retrieved successfully", 200, [task.as_dict() for task in tasks]
    )


# Get task by id
@tasks_bp.route("/<int:task_id>", methods=["GET"])
@jwt_required()
def get_task_by_id(task_id):
    # Get user's email from JWT token
    user_email = get_jwt_identity()

    # Check if the task exists
    task = Task.query.get(task_id)
    if task is None:
        return create_response("Task not found", 404)

    # Check if the task belongs to the user
    if task.owner != user_email:
        return create_response("Task does not belong to user", 403)

    return create_response("Task retrieved successfully", 200, task.as_dict())


# Get tasks by group id
@tasks_bp.route("/group/<int:group_id>", methods=["GET"])
@jwt_required()
def get_task_by_group_name(group_id):
    user_email = get_jwt_identity()

    # Check if the group exists
    group = Group.query.filter_by(id=group_id).first()
    if group is None:
        return create_response("Group not found", 404)

    # Get all tasks that belong to the group
    tasks = Task.query.filter_by(group_id=group_id, owner=user_email).all()
    return create_response(
        "Tasks retrieved successfully", 200, [task.as_dict() for task in tasks]
    )


# Get tasks sorted
@tasks_bp.route("/sort/<string:sort_by>", methods=["GET"])
@jwt_required()
def get_tasks_sorted_by_title(sort_by):
    user_email = get_jwt_identity()

    if sort_by not in ["title", "description", "completed"]:
        return create_response("Invalid sort_by parameter", 400)

    order = request.args.get("order", "asc")

    tasks = _get_user_tasks_sorted(user_email, sort_by, order)
    return create_response("Tasks retrieved successfully", 200, [task.as_dict() for task in tasks])


# Create new task
@tasks_bp.route("/", methods=["POST"])
@jwt_required()
def create_new_task():
    user_email = get_jwt_identity()
    request_body = request.get_json()

    if not request_body or not all(
        key in request_body for key in ["title", "description"]
    ):
        return create_response("Invalid request body", 400)

    title = request_body["title"]
    description = request_body["description"]
    completed = False

    if "group_id" not in request_body:
        group_id = None
    else:
        group_id = request_body["group_id"]
        group = Group.query.get(group_id)
        if group is None:
            return create_response("Group not found", 404)

    task = Task(
        title=title,
        description=description,
        group_id=group_id,
        owner=user_email,
        completed=completed,
    )
    db.session.add(task)
    db.session.commit()

    sort_by = request_body.get("sort_by", "title")
    order = request_body.get("order", "asc")

    tasks = _get_user_tasks_sorted(user_email, sort_by, order)
    return create_response(
        "Task created successfully", 201, [task.as_dict() for task in tasks]
    )


# Update an existing task
@tasks_bp.route("/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    task = Task.query.get(task_id)
    if task is None:
        return create_response("Task not found", 404)

    # Get user's email from JWT token
    user_email = get_jwt_identity()

    # Check if the task belongs to the user
    if task.owner != user_email:
        return create_response("Task does not belong to user", 403)

    request_body = request.get_json()

    if not request_body or not any(
        key in request_body for key in ["title", "description", "completed", "group_id"]
    ):
        return create_response("Invalid request body", 400)

    if "title" in request_body:
        task.title = request_body["title"]

    if "description" in request_body:
        task.description = request_body["description"]

    if "completed" in request_body:
        completed = request_body["completed"]
        if not isinstance(completed, bool) and completed.lower() not in [
            "true",
            "false",
        ]:
            return create_response("Invalid request body", 400)
        task.completed = bool(completed)

    if "group_id" in request_body:
        group_id = request_body["group_id"]
        group = Group.query.get(group_id)
        if group_id is not None and group is None:
            return create_response("Group not found", 404)
        task.group_id = group_id

    db.session.commit()

    sort_by = request_body.get("sort_by", "title")
    order = request_body.get("order", "asc")

    tasks = _get_user_tasks_sorted(user_email, sort_by, order)
    return create_response(
        "Task updated successfully", 200, [task.as_dict() for task in tasks]
    )


# Delete task
@tasks_bp.route("/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task is None:
        return create_response("Task not found", 404)

    # Get user's email from JWT token
    user_email = get_jwt_identity()

    # Check if the task belongs to the user
    if task.owner != user_email:
        return create_response("Task does not belong to user", 403)

    db.session.delete(task)
    db.session.commit()

    # Get all tasks that belong to the user
    request_body = request.get_json()
    sort_by = request_body.get("sort_by", "title")
    order = request_body.get("order", "asc")

    tasks = _get_user_tasks_sorted(user_email, sort_by, order)
    return create_response(
        "Task deleted successfully", 200, [task.as_dict() for task in tasks]
    )
