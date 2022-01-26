import "./Navbar.css"

export default function Navbar() {
  return (
    <div className="navbarContainer">
      <div className="container">
        <div className="logo">Shared Shopping</div>
        <ul className="links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
