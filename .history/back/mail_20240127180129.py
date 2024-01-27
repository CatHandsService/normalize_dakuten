from flask import Flask, request, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import unicodedata

app = Flask(__name__)
app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"}})

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'xlsx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        normalized_filename = f'normalized_{filename}'
        normalize_file(os.path.join(app.config['UPLOAD_FOLDER'], filename), os.path.join(app.config['UPLOAD_FOLDER'], normalized_filename))

        return send_file(os.path.join(app.config['UPLOAD_FOLDER'], normalized_filename), as_attachment=True, download_name=normalized_filename)

    return 'Invalid file', 400

def normalize_file(input_path, output_path):
    with open(input_path, 'rb') as file:
        content = file.read()

    normalized_content = unicodedata.normalize('NFC', content.decode('utf-8'))

    with open(output_path, 'wb') as file:
        file.write(normalized_content.encode('utf-8'))

if __name__ == '__main__':
    app.run(debug=True)
