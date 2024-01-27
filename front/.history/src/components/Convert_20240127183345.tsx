import '../App.css'

interface ConvertProps {
  selectedFile?: File;
  validMessage: string;
  handleUpload: () => void;
}

export const Convert: React.FC<ConvertProps> = (props) => {
  return (
    <div>
      <button
        className={
          props.validMessage !== ""
          ? 'convert valid'
          : 'convert failed'
        }
        onClick={props.handleUpload}
      >
        Convert
      </button>
    </div>
  )
}
