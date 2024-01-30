import '../App.css'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Convert } from './Convert';

export const ImportFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [fileName, setFileName] = useState<string>('');
  const [validMessage, setValidMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // ファイルが選択された時の処理
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setFileName(file.name);

    // エクセルで取り扱えるファイルかどうかのバリデーションを実行
    if (validateFile(file)) {
      // バリデーションが通れば、ここで必要な処理を実行
      setErrorMessage("");
      setValidMessage('The file is a file that can be handled.');
    } else {
      // バリデーションが通らない場合はエラーメッセージを表示などの処理を実行
      console.error('This file cannot be handled.');
      // window.confirm("This file cannot be handled");
      setValidMessage("");
      setErrorMessage("This file cannot be handled.");
      // setSelectedFile(null);
      // setFileName('');
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const allowedExtensions = ['.xlsx', '.xls', '.csv'];
    const lowerCaseFileName = file.name.toLowerCase();

    return allowedExtensions.some(ext => lowerCaseFileName.endsWith(ext));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // 一度に複数のファイルを選択できないようにする
  });

  const handleUpload = async () => {
    try {
        if (!selectedFile) {
            console.error('No file selected.');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);

        const corsOrigin = 'https://flasktest-i6na2t719-cathandsservice.vercel.app';

        const response = await fetch(`${corsOrigin}/upload`, {
            method: 'POST',
            mode: 'cors',
            body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          // <a>タグを作りURLとファイルネームを設定\
          const link = document.createElement('a');
          link.href = url;
          link.download = "re."+ fileName;
          // HTMLに追加
          document.body.appendChild(link);
          // クリックしてダウンロードをトリガー
          link.click();
          // 不要な要素を削除
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          // ファイル名をクリア
          setFileName('');
        } else {
            console.error('Failed to upload file.');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input className='inputField' {...getInputProps()} />
        <p>Drop your file here or click to select</p>
        {validMessage !== ""
            ? <p className='validMessage'>{validMessage}</p>
            : errorMessage !== ""
              ? <p className='failedMessage'>{errorMessage}</p>
              : null
        }
      </div>

      {selectedFile &&
        <p className='message'>selected file : {fileName}</p>
      }

      <Convert
        selectedFile={selectedFile}
        handleUpload={handleUpload}
        validMessage={validMessage}
      />
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #cccccc',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};
