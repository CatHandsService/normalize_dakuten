from flask import Flask, request, send_from_directory
from flask_cors import CORS
import pandas as pd
import unicodedata
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def normalize_filename(filename):
    # unicodedataで正規化
    normalized_filename = unicodedata.normalize('NFKC', filename)
    return normalized_filename

@app.route('/upload', methods=['POST'])
def handle_upload():
    # try:
    #     file = request.files['file']
    #     if file:
    #         # アップロードされたファイルを保存
    #         filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    #         file.save(filename)

    #         # ファイルの内容をPandasデータフレームに変換
    #         df = pd.read_excel(filename)

    #         # ファイルの内容をunicodedataで正規化
    #         df_normalized = df.applymap(lambda x: unicodedata.normalize('NFKC', str(x)))

    #         # 正規化されたファイル名を生成
    #         normalized_filename = normalize_filename(file.filename)
    #         re_prefixed_filename = f"re.{normalized_filename}"

    #         # ファイルを正規化されたファイル名で保存
    #         re_prefixed_filepath = os.path.join(app.config['UPLOAD_FOLDER'], re_prefixed_filename)
    #         df_normalized.to_excel(re_prefixed_filepath, index=False)

    #         # 正規化されたファイルへのパスを返す
    #         # return re_prefixed_filepath

    # except Exception as e:
    #     return str(e), 400
    return "hello"

@app.route('/download/<filename>')
def download(filename):
    # ファイルをダウンロード
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
