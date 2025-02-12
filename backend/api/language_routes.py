from flask import Blueprint, request, jsonify
from backend.models import db, Language
from flask_login import login_required


language_routes = Blueprint('languages', __name__)

# GET all languages
@language_routes.route('/', methods=['GET'])
def get_all_languages():
    languages = Language.query.all()
    return jsonify([language.to_dict() for language in languages]), 200

# GET a single language by code
@language_routes.route('/<string:code>', methods=['GET'])
def get_language_by_code(code):
    language = Language.query.filter_by(code=code).first()
    if not language:
        return jsonify({'error': 'Language not found'}), 404
    return jsonify(language.to_dict()), 200

# POST: Create a new language
@language_routes.route('/', methods=['POST'])
@login_required

def create_language():
    data = request.get_json()
    new_language = Language(
        name=data['name'],
        code=data['code']
    )
    db.session.add(new_language)
    db.session.commit()
    return jsonify(new_language.to_dict()), 201

# PUT to update a language by its code
@language_routes.route('/<string:code>', methods=['PUT'])
@login_required

def update_language_by_code(code):
    language = Language.query.filter_by(code=code).first()
    if not language:
        return jsonify({'error': 'Language not found'}), 404

    data = request.get_json()
    language.name = data.get('name', language.name)
    language.code = data.get('code', language.code)

    db.session.commit()

    return jsonify(language.to_dict()), 200


# DELETE a language by its code
@language_routes.route('/<string:code>', methods=['DELETE'])
@login_required

def delete_language_by_code(code):
    language = Language.query.filter_by(code=code).first()
    if not language:
        return jsonify({'error': 'Language not found'}), 404

    db.session.delete(language)
    db.session.commit()

    return jsonify({'message': 'Language deleted successfully'}), 200
