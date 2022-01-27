import "./About.css"
import { Link } from "react-router-dom"

export default function About() {
  return (
    <div className="aboutContainer">
      <h1 className="homeTitle">About Shared Shopping</h1>
      <p className="aboutText">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
        eligendi necessitatibus, iste exercitationem cum eum recusandae
        consequatur sunt ducimus reprehenderit.
      </p>
      <Link to="/signup" className="loginOut signupAbout">
        Sign Up Today
      </Link>
    </div>
  )
}
