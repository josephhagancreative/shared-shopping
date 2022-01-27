import { getAuth, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const { dispatch } = useAuthContext()

  const logout = async () => {
    console.log("logout")
    await signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" })
        navigate("/login")
      })
      .then(toast.success("Signed Out"))
      .catch((error) => {
        toast("Error Signing Out")
      })
  }
  return { logout }
}
