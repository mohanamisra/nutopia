import './App.css'
import Pipe from "./components/Pipe.jsx"
import Bird from "./components/Bird.jsx";

function App() {

  return (
    <div className = "app-container">
        <Pipe position="200px" size="150px"/>
        <Bird size = "100px"/>
    </div>
  )
}

export default App
