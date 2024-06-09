import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/menu/`)
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setRandomItems(shuffled.slice(0, 4));
      });
  }, []);

  return (
    <>
      <div>
        <h1 className="text-font">Utvalda produkter</h1>
      </div>
      <Link to="/meny">
        <div className="product-grid">
          {randomItems.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>{item.price} SEK</p>
            </div>
          ))}
        </div>
      </Link>
    </>
  );
}

export default Home;
