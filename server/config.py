import os
import binascii
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from dotenv import load_dotenv

load_dotenv()

# Determine if the app is in development or production
is_dev = os.environ.get('FLASK_ENV') == 'development'

# Conditionally set static and template folder paths based on environment
if is_dev:
    # In development, Flask doesn't need to serve static files
    app = Flask(__name__)  # No need to set static_folder or template_folder
else:
    app = Flask(
        __name__,
        static_url_path='/',
        static_folder='../client/dist',
        template_folder='../client/dist'
    )

app.config['SECRET_KEY'] = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_PUBLIC_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)