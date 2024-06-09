import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import { Link } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Meny from "./pages/Meny";
import About from "./pages/About";
import Kontakt from "./pages/Kontakt";
import Återbetalningspolicy from "./pages/Återbetalningspolicy";
import Integritetspolicy from "./pages/Integritetspolicy";
import Användarvillkor from "./pages/Användarvillkor";
import Fraktpolicy from "./pages/Fraktpolicy";
import Kontaktuppgifter from "./pages/Kontaktuppgifter";
import Rättsligtmeddelande from "./pages/Rättsligtmeddelande";
import Bekräftelse from "./pages/Bekräftelse";
import Cart from "./pages/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <div className="banner">
          <img
            src="images/new-banner.jpg"
            alt="Juicy Hamburgers"
            className="banner-image"
          />
        </div>
        <div className="nav-container">
          <div className="navbar">
            <div className="nav-logo">
              <Link to="/">
                <img src="/images/logo color.png" alt="Logo" />
              </Link>
            </div>
            <div className="nav-links">
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
            <div className="icons">
              <Link to="/cart">
                <FontAwesomeIcon className="icon-cart" icon={faCartShopping} />
              </Link>
            </div>
          </div>
        </div>
        <div className="main-content">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meny" element={<Meny />} />
            <Route path="/about" element={<About />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route
              path="/återbetalningspolicy"
              element={<Återbetalningspolicy />}
            />
            <Route path="/integritetspolicy" element={<Integritetspolicy />} />
            <Route path="/användarvillkor" element={<Användarvillkor />} />
            <Route path="/fraktpolicy" element={<Fraktpolicy />} />
            <Route path="/kontaktuppgifter" element={<Kontaktuppgifter />} />
            <Route
              path="/rättsligtmeddelande"
              element={<Rättsligtmeddelande />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="bekräftelse" element={<Bekräftelse />} />
          </Routes>
        </div>
        <div className="socials">
          <p>
            Följ oss på sociala medier för att hålla dig uppdaterad om våra
            senaste nyheter och erbjudanden:
          </p>
          <div className="social-logo-container">
            <p>
              <a href="https://www.instagram.com/bundrop">
                <img
                  className="social-logo"
                  src="/images/insta.png"
                  alt="Instagram"
                />
              </a>
            </p>
            <p>
              <a href="https://www.facebook.com/bundrop">
                <img
                  className="social-logo"
                  src="/images/Fb.png"
                  alt="Facebook"
                />
              </a>
            </p>
          </div>
        </div>
        <div className="footer">
          <div className="column">
            <Link to="/återbetalningspolicy">
              <h5>Återbetalningspolicy</h5>
            </Link>
            <Link to="/integritetspolicy">
              <h5>Integritetspolicy</h5>
            </Link>
            <Link to="/användarvillkor">
              <h5>Användarvillkor</h5>
            </Link>
          </div>
          <div className="column">
            <Link to="/fraktpolicy">
              <h5>Fraktpolicy</h5>
            </Link>
            <Link to="/kontaktuppgifter">
              <h5>Kontaktuppgifter</h5>
            </Link>
            <Link to="/rättsligtmeddelande">
              <h5>Rättsligt meddelande</h5>
            </Link>
          </div>
        </div>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </Router>
    </>
  );
}

export default App;
