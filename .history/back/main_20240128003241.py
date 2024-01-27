import re
from flask import Flask, jsonify, request, send_file, send_from_directory
from flask_cors import CORS, cross_origin
import pandas as pd
import unicodedata
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def normalize_data(file):
    # str -> bytes
    bytes_text = file.encode()

    # 濁点Unicode結合文字置換
    bytes_text = re.sub(b"\xe3\x82\x9b", b'\xe3\x82\x99', bytes_text)
    bytes_text = re.sub(b"\xef\xbe\x9e", b'\xe3\x82\x99', bytes_text)

    # 半濁点Unicode結合文字置換
    bytes_text = re.sub(b"\xe3\x82\x9c", b'\xe3\x82\x9a', bytes_text)
    bytes_text = re.sub(b"\xef\xbe\x9f", b'\xe3\x82\x9a', bytes_text)

    # bytet -> str
    file = bytes_text.decode()

    # 正規化
    file = unicodedata.normalize("NFC", file)
    return file

@app.route('/upload', methods=['POST'])
@cross_origin()
def handle_upload():
    try:
        file = request.files['file']
        if file:
            # アップロードされたファイルを保存
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filename)
            # ファイルの内容をPandasデータフレームに変換
            df = pd.read_excel(file, index_col=None, header=None)
            # ファイルの内容をunicodedataで正規化
            df_normalized = df.applymap(lambda x: normalize_data(x) if pd.notna(x) else x)
            print(df_normalized)
            # 正規化されたファイル名を生成
            re_prefixed_filename = f"re.{file.filename}"
            # ファイルを正規化されたファイル名で保存
            re_prefixed_filepath = os.path.join(app.config['UPLOAD_FOLDER'], re_prefixed_filename)
            df_normalized.to_excel(re_prefixed_filepath, index=False)
            # # 正規化されたファイルへのパスを返す
            # return jsonify({"message": "File uploaded and normalized successfully.", "path": re_prefixed_filepath})
            # 正規化されたファイルを直接レスポンスの本文に含めて返す
            return send_file(re_prefixed_filepath, as_attachment=True)
    except Exception as e:
        return str(e), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
