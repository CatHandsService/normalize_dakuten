import '../App.css'

interface ConvertProps {
  selectedFile?: File;
  handleUpload: () => void;
}

export const Convert: React.FC<ConvertProps> = (props) => {
  return (
    <div>
      <button
        className={
          props?.selectedFile !== undefined
          ? 'convert valid'
          : 'convert failed'
        }
        onClick={() => {
          const result = props.handleUpload();
          if (result instanceof Promise) {
            result.then(() => console.log('File uploaded successfully!')).catch((error) => console.error('Error uploading file:', error));
          } else {
            console.log('File uploaded successfully!');
          }
        }}        >
        Convert
      </button>
    </div>
  )
}
