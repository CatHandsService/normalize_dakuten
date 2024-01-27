import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const FileImportComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // ファイルが選択された時の処理
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setFileName(file.name);

    // エクセルで取り扱えるファイルかどうかのバリデーションを実行
    if (validateFile(file)) {
      // バリデーションが通れば、ここで必要な処理を実行
      console.log('ファイルはエクセルで取り扱えるものです。');
    } else {
      // バリデーションが通らない場合はエラーメッセージを表示などの処理を実行
      console.error('エクセルで取り扱えないファイルです。');
      setSelectedFile(null);
      setFileName('');
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
        <input {...getInputProps()} />
        <p>ファイルをここにドロップするか、クリックして選択</p>
      </div>
      {selectedFile && (
        <div>
          <p>選択されたファイル: {fileName}</p>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};