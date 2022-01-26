import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProdile,
} from "firebase/auth"
import { db } from "../firebase.config"

// Styles
import "./Auth.css"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  const { email, password } = formData

  const navigate = useNavigate()

  const onClick = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const onChange = (e) => {
    console.log(e.target.value)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submit")
  }

  return (
    <>
      <div className="pageContainer">
        <header className="loginTitle">Welcome Back!</header>
        <main>
          <form onSubmit={handleSubmit} className="loginForm">
            <div className="inputContainer">
              <input
                type="email"
                className="emailInput"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />
              <div className="passwordContainer">
                <input
                  type={showPassword ? "text" : "password"}
                  className="passwordInput"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
                <button
                  className={showPassword ? "passwordBtn" : ""}
                  onClick={onClick}>
                  <i className="fas fa-eye"></i>
                </button>
              </div>
              <button type="submit" className="loginButton">
                Login
              </button>
            </div>
          </form>
          <Link to="/signup" className="signUpLink">
            Sign Up Instead?
          </Link>
        </main>
      </div>
    </>
  )
}
