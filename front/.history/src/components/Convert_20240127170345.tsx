import '../App.css'

export const Convert = (props) => {
  return (
    <div>
      <button
        className={
          props.setSelectedFile
          ? 'convert'
          : ''
      >
        Convert
      </button>
    </div>
  )
}
