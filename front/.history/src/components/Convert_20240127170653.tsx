import '../App.css'

export const Convert = (props) => {
  return (
    <div>
      <button
        className={
          props.setSelectedFile !== null
          ? 'convert'
          : 'failed'
      >
        Convert
      </button>
    </div>
  )
}
