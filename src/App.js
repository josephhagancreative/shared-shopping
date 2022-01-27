// Components
import Navbar from "./components/Navbar"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Context
import ItemsContext, { ItemsProvider } from "./context/ItemsContext"

// Style
import "./App.css"
import About from "./Pages/About"

function App() {
  return (
    <>
      <ItemsProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </ItemsProvider>
      <ToastContainer
        position="bottom-center"
        pauseOnHover={false}
        autoClose={1500}
      />
    </>
  )
}

export default App
