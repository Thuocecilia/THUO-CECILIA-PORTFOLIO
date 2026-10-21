import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#top" className="navbar-logo" aria-label="Thuo home">
        <span className="logo-badge">t.</span>
        <span className="logo-text">
          THUO <span className="logo-divider">|</span> FULL STACK DEVELOPER®
        </span>
      </a>

      <ul className="navbar-links">
        <li>
          <a href="#work">Work</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#skills">Skills</a>
        </li>
      </ul>

      <a href="#contact" className="navbar-cta">
        LET'S TALK <span aria-hidden="true">↗</span>
      </a>
    </nav>
  )
}