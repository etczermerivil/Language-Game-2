import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.card_routes import card_routes
from .api.color_routes import color_routes

from .config import Config
from backend.seeds.all_seeds import seed_commands

from .models.user import User
from .models.deck import Deck
from .models.language import Language
from .models.part_of_speech import PartOfSpeech
from .models.word import Word
# 🔹 Initialize app
app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
app.config.from_object(Config)

# 🔹 Initialize Database & Migrations
db.init_app(app)
migrate = Migrate(app, db)  # ✅ Assign Migrate to a variable

# 🔹 Register Models to Ensure Alembic Detects Them
with app.app_context():
    from .models import user, deck, word, part_of_speech, language  # 🔥 Add this line
    db.create_all()  # 🔥 Ensure all models exist

# 🔹 CLI Commands
app.cli.add_command(seed_commands)

# 🔹 Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    try:
        return User.query.get(int(id))
    except ValueError:
        return None

# 🔹 Register Blueprints
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(card_routes, url_prefix='/api/cards')
app.register_blueprint(color_routes, url_prefix='/api/colors')

# 🔹 Security and Middleware
CORS(app, supports_credentials=True)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            return redirect(url, 301)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
        httponly=False)
    return response

# 🔹 API Documentation
@app.route("/api/docs")
def api_help():
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list

# 🔹 React Frontend Routing
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
