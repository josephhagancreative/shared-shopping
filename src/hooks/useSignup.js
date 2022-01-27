import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { toast } from "react-toastify"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { useAuthContext } from "../hooks/useAuthContext"

export function useSignup() {
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()
  const auth = getAuth()
  const navigate = useNavigate()

  const signup = async (name, email, password, formData) => {
    setError(null)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      dispatch({ type: "LOGIN", payload: user })

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, "users", user.uid), formDataCopy)

      toast.success("Successfully Signed Up")

      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Problem Signing Up")
    }
  }

  return { error, signup }
}
