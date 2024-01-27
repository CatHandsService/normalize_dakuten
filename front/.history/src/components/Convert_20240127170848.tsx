import '../App.css'

export const Convert = (props: any) => {
  return (
    <div>
      <button
        className={
          props.selectedFile !== null
          ? 'convert'
          : 'failed'
        }
      >
        Convert
      </button>
    </div>
  )
}
