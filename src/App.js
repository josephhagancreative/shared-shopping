// Components
import Navbar from "./components/Navbar"
import Home from "./Pages/Home"

// Context
import ItemsContext, { ItemsProvider } from "./context/ItemsContext"

// Style
import "./App.css"

function App() {
  return (
    <ItemsProvider>
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </ItemsProvider>
  )
}

export default App
