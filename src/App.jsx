import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";
// TODO: importera en fil istället för alla en och en
import Home from "./pages/Home";
import Meny from "./pages/Meny";
import About from "./pages/About";
import Kontakt from "./pages/Kontakt";
import Återbetalningspolicy from "./pages/Återbetalningspolicy";

function App() {
  return (
    <>
      <Router>
        <>
          <div className="nav-container">
            <div className="nav-logo">
              <img src="images/logo black.png" />
            </div>
            <div className="navbar">
              <Link to="/">
                <h2>Hem</h2>
              </Link>
              <Link to="/meny">
                <h2>Meny</h2>
              </Link>
              <Link to="/about">
                <h2>Om oss</h2>
              </Link>
              <Link to="/kontakt">
                <h2>Kontakta oss</h2>
              </Link>
            </div>
          </div>
        </>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meny" element={<Meny />} />
          <Route path="/about" element={<About />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route
            path="/återbetalningspolicy"
            element={<Återbetalningspolicy />}
          />
        </Routes>
        <div className="socials">
          <h2>Följ oss</h2>
          <p>
            Följ oss på sociala medier för att hålla dig uppdaterad om våra
            senaste nyheter och erbjudanden:
          </p>
          <div className="social-logo-container">
            <p>
              <a href="https://www.instagram.com/bundrop">
                <img className="social-logo" src="/images/insta.png" />
              </a>
            </p>
            <p>
              <a href="https://www.facebook.com/bundrop">
                <img className="social-logo" src="/images/Fb.png" />
              </a>
            </p>
          </div>
        </div>
        <div className="footer">
          <Link to="/återbetalningspolicy">
            <h4>Återbetalningspolicy</h4>
          </Link>
        </div>
      </Router>
    </>
  );
}

export default App;
