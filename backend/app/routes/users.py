from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from app.forms.user_forms import UserLoginForm, UserRegisterForm
from app.models.user import User
from app.utils.logger import logger
from app.models import db
from app.utils.route_helpers import create_response, hash_password, verify_password

users_bp = Blueprint("users", __name__, url_prefix="/api")

# Route for user login
@users_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    form = UserLoginForm(data=data)

    # Log the user get request
    logger.log("INFO", f"A Login request received for email: {email}, from IP: {request.remote_addr}")

    # Check if the form data is valid
    if not form.validate_on_submit():
        # Handle form validation failure
        logger.log("ERROR", f"Form validation for login request had failed for user: {email}, form errors: {form.errors}")
        return create_response(f"Form validation failed", 400, data=form.errors)

    # Check if the user with the provided email exists
    user = User.query.filter_by(email=email).first()
    if user is None:
        logger.log("DEBUG", f"Login request had failed due to nonexistent/deleted user({email})")
        return create_response(f"Incorrect credentials", 400, data=['Incorrect credentials'])
    
    # Check if provided password is correct
    correct_password = verify_password(password, user.password)
    if correct_password is False:
        logger.log("DEBUG", f"Login request had failed due to incorrect password ({email})")
        return create_response(f"Incorrect credentials", 400, data=['Incorrect credentials'])
    
    access_token = create_access_token(identity=email)
    return create_response('Succesful login', 200, {'access_token':access_token})


# Route for user registration
@users_bp.route("/register", methods=["POST"])
def register():
    # Extract data from the JSON request
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Log the registration request
    logger.log("INFO", f"Registration request received for email: {email}, from IP: {request.remote_addr}")

    # Create a form object based on the request data
    form = UserRegisterForm(data=data)

    # Check if the form data is valid
    if not form.validate_on_submit():
        logger.log("ERROR", f"Form validation for user registration had failed for user: {email}, form errors: {form.errors}")
        return create_response(f"Form validation failed", 400 ,data=form.errors)

    # Check if the email is already registered in the database
    emailRegistered = User.query.filter_by(email=email).first()
    if emailRegistered is not None:
        # Return a response indicating that the email is already registered
        return create_response("Email already registered", 400, data=['Email already registered'])

    try:
        # Hash the password 
        hashed_password = hash_password(password)

        # Create a new User object with the email and hashed password
        user_object = User(email=email, password=hashed_password)

        # Add the User object to the database session
        db.session.add(user_object)

        # Commit the changes to the database
        db.session.commit()

        # Generate an access_token
        access_token = create_access_token(identity=email)

        # Return a success response
        logger.log("INFO", f"Registration successful for email: {email}, from IP: {request.remote_addr}")
        return create_response("Registration successful", 200, {'access_token':access_token})
    except Exception as e:
        # If an exception occurs during registration, log the error and return an error response
        email = data.get("email")
        logger.log("ERROR", f"Registration process failed for email: {email}, Error: {str(e)}")
        return create_response("Registration process failed", 500)

