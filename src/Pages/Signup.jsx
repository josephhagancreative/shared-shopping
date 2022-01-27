import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { toast } from "react-toastify"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import ItemsContext from "../context/ItemsContext"
import Spinner from "../components/Spinner"

// Styles
import "./Auth.css"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = formData

  const { isLoading, setIsLoading } = useContext(ItemsContext)

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      setIsLoading(true)

      await setDoc(doc(db, "users", user.uid), formDataCopy)

      toast.success("Successfully Signed Up")

      navigate("/")
      setIsLoading(false)
    } catch (error) {
      toast.error("Problem Signing Up")
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <>
        <div className="pageContainer">
          <header className="loginTitle">Share Your List Today!</header>
          <main>
            <form onSubmit={handleSubmit} className="loginForm">
              <div className="inputContainer">
                <input
                  type="name"
                  className="nameInput"
                  placeholder="Name"
                  id="name"
                  value={name}
                  onChange={onChange}
                />
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
                  Signup
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
}
