// Components
import Navbar from "./components/Navbar"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import NotFound from "./Pages/NotFound"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAuthContext } from "./hooks/useAuthContext"

// Context
import ItemsContext, { ItemsProvider } from "./context/ItemsContext"

// Style
import "./App.css"
import About from "./Pages/About"

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <ItemsProvider>
          <Router>
            <Navbar />
            <Routes>
              {user && <Route path="/" element={<Home />} />}
              {!user && <Route path="/" element={<Navigate to="/login" />} />}
              <Route path="/about" element={<About />} />
              {!user && <Route path="/login" element={<Login />} />}
              {user && <Route path="/login" element={<Navigate to="/" />} />}
              {!user && <Route path="/signup" element={<Signup />} />}
              {user && <Route path="/signup" element={<Navigate to="/" />} />}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ItemsProvider>
      )}
      <ToastContainer
        position="bottom-center"
        pauseOnHover={false}
        autoClose={1500}
      />
    </div>
  )
}

export default App
