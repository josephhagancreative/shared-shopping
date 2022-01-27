import { useState } from "react"
import { Link } from "react-router-dom"

// Styles
import "./Auth.css"
import { useLogin } from "../hooks/useLogin"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  const { login } = useLogin()

  const { email, password } = formData

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

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className="pageContainer">
      <header className="loginTitle">Welcome Back!</header>
      <main>
        <form onSubmit={handleSubmit} className="loginForm">
          <h3 className="authTitle">Log In</h3>
          <div className="authInputContainer">
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
              Login
            </button>
          </div>
        </form>
        <Link to="/signup" className="signUpLink">
          Sign Up Instead?
        </Link>
      </main>
    </div>
  )
}
