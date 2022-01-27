import { Link } from "react-router-dom"
import { useState } from "react"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

// Styles
import "./Navbar.css"

export default function Navbar() {
  const [showNav, setShowNav] = useState(false)
  const { logout } = useLogout()
  const { user, authIsReady } = useAuthContext()

  const signout = () => {
    logout()
    setShowNav(false)
  }

  const toggleNav = () => {
    setShowNav(!showNav)
  }

  return (
    <div className="navbarContainer">
      <div className="container">
        <div className="logoContainer">
          <div className="logo">Shared Shopping</div>
          <div className="mobileNavButton" onClick={toggleNav}>
            <i className="fas fa-bars fa-lg"></i>
          </div>
        </div>
        <ul className={`links ${showNav ? "" : "hide"}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            {user ? (
              <a onClick={signout} className="loginOut">
                Logout
              </a>
            ) : (
              <Link to="/login" className="loginOut">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
