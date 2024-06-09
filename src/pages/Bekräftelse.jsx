import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Bekräftelse() {
  const location = useLocation();
  const { cart, total, address, paymentMethod } = location.state || {
    cart: [],
    total: 0,
    address: {},
  };
  const [time, setTime] = useState(0);

  useEffect(() => {
    const randomTime = Math.floor(Math.random() * (26 - 18 + 1) + 18) * 60;
    setTime(randomTime);

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bekräftelse-container">
      <h1>Bekräftelse</h1>
      <h2>Beställningsöversikt</h2>
      <ul>
        {cart.map((item) => (
          <div key={item.id}>
            <img src={item.image} style={{ width: "50px" }} />
            <div>
              <h3>{item.title}</h3>
              <p>
                {item.quantity} x {item.price} SEK
              </p>
            </div>
          </div>
        ))}
      </ul>
      <h2>Totalsumma: {total} SEK</h2>
      <h2>Leveransadress</h2>
      <p>Namn: {address.name}</p>
      <p>Gata: {address.street}</p>
      <p>Stad: {address.city}</p>
      <p>Postnummer: {address.postalCode}</p>
      <h2>Betalmedel: {paymentMethod === "swish" ? "Swish" : "Kort"}</h2>
      <h2>Beräknad leveranstid</h2>
      <p>
        Tid kvar: {`${Math.floor(time / 60)}`.padStart(2, "0")}:
        {`${time % 60}`.padStart(2, "0")}
      </p>
    </div>
  );
}

export default Bekräftelse;
