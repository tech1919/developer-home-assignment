from app.routes.users import users_bp
from app.routes.tasks import tasks_bp
from app.routes.groups import groups_bp

# Register blueprints
def init_routes(app):
    app.register_blueprint(users_bp, url_prefix="/api/users") 
    app.register_blueprint(tasks_bp, url_prefix="/api/tasks") 
    app.register_blueprint(groups_bp, url_prefix="/api/groups")

    return app