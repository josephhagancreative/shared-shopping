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

  const { isLoading, setIsLoading, setUser } = useContext(ItemsContext)

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
      setIsLoading(true)
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        setUser(userCredential)
        toast.success("Successfully Logged In")
        navigate("/")
        setIsLoading(false)
      }
    } catch (error) {
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
                    type="button"
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
}
