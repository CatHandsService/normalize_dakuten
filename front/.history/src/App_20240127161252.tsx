import { Header } from "./components/Header"
import { ImportFile } from "./components/ImportFile"
import './App.css'
import { Convert } from "./components/Convert"

function App() {

  return (
    <div>
      <Header />
      <div className="container">
        <ImportFile />
        <Convert />
      </div>
    </div>
  )
}

export default App
