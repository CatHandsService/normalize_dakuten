import '../App.css'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Convert } from './Convert';

export const ImportFile = () => {
  const [selectedFile, setSelectedFile] = useState<File>(null);
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
      setValidMessage('The file is a file that can be handled by Excel.');
      console.log('The file is a file that can be handled by Excel.');
    } else {
      // バリデーションが通らない場合はエラーメッセージを表示などの処理を実行
      console.error('This file cannot be handled by Excel.');
      // window.confirm("This file cannot be handled by Excel.");
      setValidMessage("");
      setErrorMessage("This file cannot be handled by Excel.");
      setSelectedFile(null);
      // setFileName('');
    }
  }, []);

  const validateFile = (file: File): boolean => {
    // エクセルで取り扱えるかのバリデーションロジックをここに実装
    // 例として、拡張子がxlsxの場合にtrueを返すものとします
    return file.name.toLowerCase().endsWith('.xlsx');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // 一度に複数のファイルを選択できないようにする
    accept: '.xlsx', // 受け入れるファイルの種類を指定
  });

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
      <p className='message'>selected file : {fileName}</p>
      <Convert selectedFile={selectedFile}/>
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #cccccc',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};