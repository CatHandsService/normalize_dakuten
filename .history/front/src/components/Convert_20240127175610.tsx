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
        onClick={props.handleUpload}
      >
        Convert
      </button>
    </div>
  )
}
