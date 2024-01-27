import '../App.css'

export const Convert = (props: any) => {
  return (
    <div>
      <button
        className={
          props.selectedFile !== null
          ? 'convert valid'
          : 'convert failed'
        }
      >
        Convert
      </button>
    </div>
  )
}
