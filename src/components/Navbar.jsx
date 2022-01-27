import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { getAuth, signOut } from "firebase/auth"

// Styles
import "./Navbar.css"

export default function Navbar() {
  const [showNav, setShowNav] = useState(false)
  const auth = getAuth()
  const navigate = useNavigate()

  const signout = () => {
    signOut(auth)
      .then(() => {
        setShowNav(false)
        navigate("/login")
      })
      .then(toast.success("Signed Out"))
      .catch((error) => {
        toast("Error Signing Out")
      })
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
            {auth.currentUser ? (
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
