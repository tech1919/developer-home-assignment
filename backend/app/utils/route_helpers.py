import bcrypt
from flask import jsonify, make_response


def create_response(message, status_code, data=None):
    response_data = {"message": message, "status_code": status_code}
    if data:
        response_data['data'] = data

    response = make_response(jsonify(response_data), status_code)
    return response

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def verify_password(input_password, hashed_password):
    input_password_bytes = input_password.encode('utf-8')
    return bcrypt.checkpw(input_password_bytes, hashed_password)
