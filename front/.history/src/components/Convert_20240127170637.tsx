import '../App.css'

export const Convert = (props) => {
  return (
    <div>
      <button
        className={
          props.setSelectedFile !== null
          ? 'convert'
          : 'faild'
      >
        Convert
      </button>
    </div>
  )
}
