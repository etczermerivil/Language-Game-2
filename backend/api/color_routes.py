import re

from flask import Blueprint, request, jsonify
from backend.models import db, PartOfSpeech
from flask_login import login_required

color_routes = Blueprint('colors', __name__)

# GET all color schemes
@color_routes.route('/', methods=['GET'])
def get_all_colors():
    colors = PartOfSpeech.query.all()
    return jsonify([color.to_dict() for color in colors]), 200


# POST: Create a new color scheme
@color_routes.route('/', methods=['POST'])
@login_required

def create_color():
    data = request.get_json()

    # Check if required fields are missing
    if not data.get('name'):
        return jsonify({"error": "Missing required field: name"}), 400
    if not data.get('color_code'):
        return jsonify({"error": "Missing required field: color_code"}), 400

    # Validate color_code format (hexadecimal color code)
    if not re.match(r'^#[0-9A-Fa-f]{6}$', data['color_code']):
        return jsonify({"error": "Invalid color code format."}), 400

    new_color = PartOfSpeech(
        name=data['name'],
        color_code=data['color_code']
    )
    db.session.add(new_color)
    db.session.commit()
    return jsonify(new_color.to_dict()), 201

# PUT: Update an existing color scheme
@color_routes.route('/<int:color_id>', methods=['PUT'])
@login_required

def update_color(color_id):
    color = PartOfSpeech.query.get(color_id)
    if not color:
        return jsonify({'error': 'Color scheme not found'}), 404
    data = request.get_json()
    color.name = data.get('name', color.name)
    color.color_code = data.get('color_code', color.color_code)
    db.session.commit()
    return jsonify(color.to_dict()), 200

# DELETE: Remove a color scheme
@color_routes.route('/<int:color_id>', methods=['DELETE'])
@login_required

def delete_color(color_id):
    color = PartOfSpeech.query.get(color_id)
    if not color:
        return jsonify({'error': 'Color scheme not found'}), 404
    db.session.delete(color)
    db.session.commit()
    return jsonify({'message': 'Color scheme deleted successfully'}), 200
