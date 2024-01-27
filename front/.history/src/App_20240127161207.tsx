import { Header } from "./components/Header"
import { ImportFile } from "./components/ImportFile"
import './App.css'
import { Convert } from "./components/Convert"

function App() {

  return (
    <div className="container">
      <Header />
      <ImportFile />
      <Convert />
    </div>
  )
}

export default App
