#!/bin/sh
set -e  # Exit immediately if a command fails

# Run migrations
flask db upgrade

# Run seeding
flask seed all || echo "Seeding failed or was already applied."

# Start the application
exec gunicorn backend:app
