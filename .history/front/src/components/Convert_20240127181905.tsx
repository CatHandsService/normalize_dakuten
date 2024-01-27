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
        onClick={async () => {
          try {
            await props.handleUpload();
            console.log('File uploaded successfully!');
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }}
      >        Convert
      </button>
    </div>
  )
}
