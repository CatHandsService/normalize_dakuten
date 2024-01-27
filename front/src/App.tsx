// import { Helmet } from 'react-helmet-async'
import './App.css'
import { Header } from './components/Header'
import { ImportFile } from './components/ImportFile'

function App() {

  return (
    <div className='main'>
      <Header />
      <div className='container'>
        <ImportFile />
      </div>
    </div>
  )
}

export default App
