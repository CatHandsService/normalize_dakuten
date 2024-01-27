from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin
import pandas as pd
import unicodedata
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def normalize_filename(filename):
    # unicodedataで正規化
    normalized_filename = unicodedata.normalize('NFKC', str(filename))
    return normalized_filename

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
            df = pd.read_excel(filename)

            # ファイルの内容をunicodedataで正規化
            df_normalized = df.applymap(lambda x: normalize_filename(x) if pd.notna(x) else x)
            print(df_normalized)
            # 正規化されたファイル名を生成
            re_prefixed_filename = f"re.{file.filename}"
            print(re_prefixed_filename)
            # ファイルを正規化されたファイル名で保存
            re_prefixed_filepath = os.path.join(app.config['UPLOAD_FOLDER'], re_prefixed_filename)
            df_normalized.to_excel(re_prefixed_filepath, index=False)

    #         # 正規化されたファイルへのパスを返す
    #         # return re_prefixed_filepath
        # return file
        return jsonify({'message': 'successfully'}), 200
    except Exception as e:
        # return str(e), 400
        return jsonify({'error': str(e)}), 500

# @app.route('/download/<filename>')
# def download(filename):
#     # ファイルをダウンロード
#     return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
