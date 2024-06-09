import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [formData, setFormData] = useState({
    swishNumber: "",
    cardNumber: "",
    cardDate: "",
    cardName: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleProceedToAddress = () => {
    setShowAddressForm(true);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const inputValue =
      name === "postalCode" ? value.replace(/\D/g, "").slice(0, 5) : value;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: inputValue,
    }));
  };

  const validateAddress = () => {
    const newErrors = {};
    if (!address.name || address.name.length < 3) {
      newErrors.name = "Namn måste vara minst 3 tecken långt";
    }
    if (!address.street || address.street.length < 3) {
      newErrors.street = "Gata måste vara minst 3 tecken lång";
    }
    if (!address.city || address.city.length < 3) {
      newErrors.city = "Stad måste vara minst 3 tecken lång";
    }
    if (!address.postalCode) {
      newErrors.postalCode = "Vänligen fyll i postnummer";
    } else if (address.postalCode.length !== 5) {
      newErrors.postalCode = "Postnumret måste vara exakt 5 siffror";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (validateAddress()) {
      setShowPaymentOptions(true);
      setShowAddressForm(false);
    }
  };

  const handleEditAddress = () => {
    setShowAddressForm(true);
    setShowPaymentOptions(false);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity);
    }
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setFormData({
      swishNumber: "",
      cardNumber: "",
      cardDate: "",
      cardName: "",
      cvc: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let inputValue = value;
    if (name === "swishNumber") {
      inputValue = inputValue.replace(/\D/g, "").slice(0, 10);
    } else if (name === "cardNumber") {
      inputValue = inputValue.replace(/\D/g, "").slice(0, 16);
    } else if (name === "cardDate") {
      inputValue = inputValue.replace(/\D/g, "").slice(0, 4);
    } else if (name === "cvc") {
      inputValue = inputValue.replace(/\D/g, "").slice(0, 3);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const cardNumberRegex = /^[0-9]{16}$/;
    const cardDateRegex = /^[0-9]{4}$/;
    const cvcRegex = /^[0-9]{3}$/;

    if (paymentMethod === "swish") {
      if (!formData.swishNumber) {
        newErrors.swishNumber = "Vänligen fyll i ett Swishnummer";
      } else if (formData.swishNumber.length !== 10) {
        newErrors.swishNumber = "Swishnumret måste vara exakt 10 siffror";
      }
    }

    if (paymentMethod === "card") {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Vänligen ange ett kortnummer";
      } else if (!cardNumberRegex.test(formData.cardNumber)) {
        newErrors.cardNumber = "Kortnumret måste vara exakt 16 siffror";
      }
      if (!formData.cardDate) {
        newErrors.cardDate = "Vänligen fyll i ett giltighetsdatum";
      } else if (!cardDateRegex.test(formData.cardDate)) {
        newErrors.cardDate =
          "Giltighetsdatumet måste vara exakt 4 siffror (MMYY)";
      } else {
        const month = parseInt(formData.cardDate.slice(0, 2), 10);
        const year = parseInt(formData.cardDate.slice(2), 10);
        if (month < 1 || month > 12) {
          newErrors.cardDate = "Månaden måste vara mellan 01 och 12";
        }
        if (year < 24) {
          newErrors.cardDate = "Året måste vara 24 eller senare";
        }
      }
      if (!formData.cardName) {
        newErrors.cardName = "Vänligen fyll i för- och efternamn";
      }
      if (!formData.cvc) {
        newErrors.cvc = "Vänligen fyll i CVC";
      } else if (!cvcRegex.test(formData.cvc)) {
        newErrors.cvc = "CVC måste vara exakt 3 siffror";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/bekräftelse", {
        state: { cart, total, address, paymentMethod },
      });
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const isAddressFilled = () => {
    return Object.values(address).every((field) => field.trim() !== "");
  };

  return (
    <div className="cart-container">
      <h1>Varukorgen</h1>
      {cart.length === 0 ? (
        <p>Din varukorg är tom</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <p>{item.price} SEK</p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    min="1"
                  />
                  <button onClick={() => removeFromCart(item.id)}>
                    Ta bort från varukorgen
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h2>Totalsumma: {total} SEK</h2>
          {!showAddressForm && !showPaymentOptions && (
            <button className="payment-btn" onClick={handleProceedToAddress}>
              Gå vidare
            </button>
          )}
        </>
      )}

      {showAddressForm && (
        <div className="address-form-container">
          <h2>Fyll i din leveransadress</h2>
          <form className="address-form" onSubmit={handleAddressSubmit}>
            <div className="form-group">
              <label htmlFor="name">Namn</label>
              <input
                type="text"
                id="name"
                name="name"
                value={address.name}
                onChange={handleAddressChange}
                required
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="street">Gata</label>
              <input
                type="text"
                id="street"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
                required
              />
              {errors.street && <p className="error">{errors.street}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="city">Stad</label>
              <input
                type="text"
                id="city"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                required
              />
              {errors.city && <p className="error">{errors.city}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postnummer</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={address.postalCode}
                onChange={handleAddressChange}
                required
              />
              {errors.postalCode && (
                <p className="error">{errors.postalCode}</p>
              )}
            </div>
            <button type="submit">Fortsätt</button>
          </form>
        </div>
      )}

      {showPaymentOptions && (
        <>
          <div className="address-info-container">
            <h2>Din leveransadress</h2>
            <p>Namn: {address.name}</p>
            <p>Gata: {address.street}</p>
            <p>Stad: {address.city}</p>
            <p>Postnummer: {address.postalCode}</p>
            <button onClick={handleEditAddress}>Ändra adress</button>
          </div>

          <div className="payment-options">
            <h2>Betalningsmetoder</h2>
            <button onClick={() => handlePaymentMethod("swish")}>
              Betala med Swish
            </button>
            <button onClick={() => handlePaymentMethod("card")}>
              Betala med kort
            </button>
          </div>
        </>
      )}

      {paymentMethod === "swish" && (
        <div className="payment-form-container">
          <h2>Betala med Swish</h2>
          <form className="payment-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="swishNumber">Swishnummer: </label>
              <input
                type="text"
                id="swishNumber"
                name="swishNumber"
                value={formData.swishNumber}
                onChange={handleChange}
                required
              />
              {errors.swishNumber && (
                <p className="error">{errors.swishNumber}</p>
              )}
            </div>
            <div className="form-group">
              <label>Belopp</label>
              <p>{total} SEK</p>
            </div>
            <button type="submit">Betala</button>
          </form>
        </div>
      )}

      {paymentMethod === "card" && (
        <div className="payment-form-container">
          <h2>Betala med kort</h2>
          <form className="payment-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Kortnummer: </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
              {errors.cardNumber && (
                <p className="error">{errors.cardNumber}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="cardDate">Kortdatum: </label>
              <input
                type="text"
                id="cardDate"
                name="cardDate"
                placeholder="MMYY"
                value={formData.cardDate}
                onChange={handleChange}
                required
              />
              {errors.cardDate && <p className="error">{errors.cardDate}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="cardName">Namn på kort: </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={(e) =>
                  setFormData({ ...formData, cardName: e.target.value })
                }
                required
              />
              {errors.cardName && <p className="error">{errors.cardName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="cvc">CVC: </label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
                required
              />
              {errors.cvc && <p className="error">{errors.cvc}</p>}
            </div>
            <div className="form-group">
              <label>Belopp</label>
              <p>{total} SEK</p>
            </div>
            <button type="submit">Betala</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Cart;
