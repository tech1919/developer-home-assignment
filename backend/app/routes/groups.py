from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from app.models.group import Group
from app.models.db import db
from app.utils.route_helpers import create_response
from flask_jwt_extended import get_jwt_identity
from app.models.task import Task
import random
import string


groups_bp = Blueprint("groups", __name__, url_prefix="/api")

# Get all groups that belong to the user
@groups_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_groups():
    user_email = get_jwt_identity()

    groups = Group.query.filter_by(owner=user_email).all()

    return create_response("All groups retrieved successfully", 200, [group.as_dict() for group in groups])


# Create a new group
@groups_bp.route("/", methods=["POST"])
@jwt_required()
def create_group():
    user_email = get_jwt_identity()
    data = request.get_json()
    title = data.get("title")
    color = data.get("color")

    # Check if the group title is unique
    group = Group.query.filter_by(title=title, owner=user_email).first()
    if group is not None:
        return create_response("Group title already exists", 400)

    if color is None:
        # Generate a random hex color string
        color = "#" + ''.join(random.choices(string.hexdigits, k=6))

    # Create a new group
    new_group = Group(title=title, owner=user_email, color=color)
    db.session.add(new_group)
    db.session.commit()

    groups = Group.query.filter_by(owner=user_email).all()
    return create_response("Group created successfully", 200, data=[group.as_dict() for group in groups])


# Delete a group
@groups_bp.route("/<int:group_id>", methods=["DELETE"])
@jwt_required()
def delete_group(group_id):
    user_email = get_jwt_identity()

    # Check if the group exists
    group = Group.query.filter_by(id=group_id, owner=user_email).first()
    if group is None:
        return create_response("Group does not exist", 400)

    # Modify all tasks witht the group_id to have a group_id of None
    tasks = Task.query.filter_by(group_id=group_id).all()
    for task in tasks:
        task.group_id = None

    # Delete the group
    db.session.delete(group)
    db.session.commit()

    groups = Group.query.filter_by(owner=user_email).all()
    return create_response("Group deleted successfully", 200, data=[group.as_dict() for group in groups])