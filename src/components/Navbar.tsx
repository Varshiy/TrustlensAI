import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🛡️ TrustLens AI</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/detect">Detect</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;