import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSignup } from "../hooks/useSignup"
import ItemsContext from "../context/ItemsContext"

// Styles
import "./Auth.css"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { signup } = useSignup()

  const { name, email, password } = formData

  const onClick = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  // Add document
  const handleSubmit = async (e) => {
    e.preventDefault()
    signup(name, email, password, formData)
  }

  return (
    <>
      <div className="pageContainer">
        <header className="loginTitle">Share Your List Today!</header>
        <main>
          <form onSubmit={handleSubmit} className="loginForm">
            <h3 className="authTitle">Sign Up</h3>
            <div className="authInputContainer">
              <div className="emailContainer">
                <label htmlFor="name">Name:</label>
                <input
                  type="name"
                  className="nameInput"
                  placeholder="Name"
                  id="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="emailContainer">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="emailInput"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="passwordContainer">
                <label htmlFor="password">Password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="passwordInput"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
                <button
                  type="button"
                  className={showPassword ? "passwordBtn show" : "passwordBtn"}
                  onClick={onClick}>
                  <i className="fas fa-eye"></i>
                </button>
              </div>
              <button type="submit" className="loginButton">
                Sign Up
              </button>
            </div>
          </form>
          <Link to="/login" className="signUpLink">
            Log In Instead?
          </Link>
        </main>
      </div>
    </>
  )
}
