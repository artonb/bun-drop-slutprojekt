import React from "react";

function Kontaktuppgifter() {
  return (
    <>
      <div class="about-container">
        <h1>Kontaktinformation</h1>
        <p>
          Välkommen till Bun Drop AB! Om du har några frågor, förslag eller
          behöver hjälp, tveka inte att kontakta oss. Här hittar du all
          nödvändig kontaktinformation.
        </p>

        <h2>Adress</h2>
        <p>
          Bun Drop AB
          <br />
          Newtonvägen 1
          <br />
          12345 Malmö
          <br />
          Sverige
        </p>

        <h2>Email</h2>
        <p>
          För allmänna frågor och support:{" "}
          <a href="mailto:support@bundrop.se">support@bundrop.se</a>
        </p>

        <h2>Telefon</h2>
        <p>Du kan nå oss på telefon: 0123-456789</p>

        <h2>Öppettider</h2>
        <p>Vår kundtjänst är tillgänglig under följande tider:</p>
        <ul>
          <li>Måndag - Fredag: 09:00 - 18:00</li>
          <li>Lördag: 10:00 - 16:00</li>
          <li>Söndag: Stängt</li>
        </ul>

        <h2>Sociala Medier</h2>
        <p>
          Följ oss på sociala medier för att hålla dig uppdaterad om våra
          senaste nyheter och erbjudanden:
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
    </>
  );
}

export default Kontaktuppgifter;
