import '../App.css'

export const Convert = (props: function) => {
  return (
    <div>
      <button
        className={
          props.setSelectedFile
          ? 'convert'
          : ''
      >Convert</button>
    </div>
  )
}
