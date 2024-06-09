import React from "react";

function Kontakt() {
  return (
    <>
      <div className="about-container">
        <h1>Kontakta oss</h1>
        <p>
          Har du frågor eller behöver du hjälp? Vänligen kontakta oss via
          följande kanaler:
        </p>
        <div>
          <p>
            Adress:
            <br />
            <strong>Bun Drop AB</strong>
            <br />
            Newtonvägen 1
            <br />
            123 45 Malmö
            <br />
            <br />
            Email:
            <br />
            <a href="mailto:support@bundrop.se">support@bundrop.se</a>
          </p>

          <div className="social-contact">
            <p>
              <a href="https://www.facebook.com/bundrop">
                <img
                  className="social-logo"
                  src="/images/Fb.png"
                  alt="Facebook"
                />
              </a>
            </p>
            <p>
              <a href="https://www.instagram.com/bundrop">
                <img
                  className="social-logo"
                  src="/images/insta.png"
                  alt="Instagram"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Kontakt;
