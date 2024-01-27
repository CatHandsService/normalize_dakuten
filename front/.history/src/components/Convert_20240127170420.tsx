import '../App.css'

export const Convert = (props) => {
  return (
    <div>
      <button
        className={
          props.setSelectedFile !== null
          ? 'falid'
          : 'faild'
      >
        Convert
      </button>
    </div>
  )
}
