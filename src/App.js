// Components
import Navbar from "./components/Navbar"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Context
import ItemsContext, { ItemsProvider } from "./context/ItemsContext"

// Style
import "./App.css"

function App() {
  return (
    <>
      <ItemsProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </ItemsProvider>
    </>
  )
}

export default App
