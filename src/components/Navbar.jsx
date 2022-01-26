import { Link } from "react-router-dom"
import { getAuth } from "firebase/auth"

// Styles
import "./Navbar.css"

export default function Navbar() {
  const auth = getAuth()

  const logout = () => {
    console.log("logout")
  }
  return (
    <div className="navbarContainer">
      <div className="container">
        <div className="logo">Shared Shopping</div>
        <ul className="links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <Link to="/about">About</Link>
          <li>
            {auth.currentUser ? (
              <a to="/login" onClick={logout}>
                Logout
              </a>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
