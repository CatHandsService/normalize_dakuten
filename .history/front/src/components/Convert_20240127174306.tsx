import '../App.css'

// interface ConvertProps {
//   data: string;
//   fileName: string;
//   props: File | undefined;
//   handleUpload: () => Promise<void>;
// }

export const Convert = (props: File | undefined) => {
  // const handleExport = () => {
  //   const blob = new Blob([data], { type: 'application/octet-stream' });
  //   const url = URL.createObjectURL(blob);

  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = fileName;
  //   document.body.appendChild(link);

  //   // クリックしてダウンロードをトリガー
  //   link.click();

  //   // 不要な要素を削除
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // };

  return (
    <div>
      <button
        className={
          props?.selectedFile !== undefined
          ? 'convert valid'
          : 'convert failed'
        }
        // onClick={handleExport}
      >
        Convert
      </button>
    </div>
  )
}
