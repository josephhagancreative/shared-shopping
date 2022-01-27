import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    if (userCredential.user) {
      dispatch({ type: "LOGIN", payload: userCredential.user })
      toast.success("Successfully Logged In")
      navigate("/")
    } else {
      console.error(error)
      toast.error("Problem Logging In")
    }
  }

  return { login }
}
