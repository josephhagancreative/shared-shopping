import { useState, useContext, useEffect } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import ItemsContext from "../context/ItemsContext"
import Spinner from "../components/Spinner"

// Styles
import "./Auth.css"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  const { isLoading, setIsLoading } = useContext(ItemsContext)

  const { email, password } = formData

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(false)
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      setIsLoading(true)

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        toast.success("Successfully Logged In")
        navigate("/")
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
      toast.error("Problem Logging In")
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <>
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
                    className={
                      showPassword ? "passwordBtn show" : "passwordBtn"
                    }
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
}
