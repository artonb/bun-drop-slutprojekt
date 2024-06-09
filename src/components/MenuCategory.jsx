import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MenuCategory({ menu, filter }) {
  const { addToCart } = useContext(CartContext);
  const items = menu.filter((item) => item.category === filter);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`Du har lagt till ${item.title} i varukorgen!`);
  };

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="menu-item">
          <img src={item.image} />
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>{item.price} SEK</p>
          <button className="add-to-cart" onClick={() => handleAddToCart(item)}>
            <FontAwesomeIcon icon={faCartShopping} /> Lägg till i varukorgen
          </button>
        </div>
      ))}
    </>
  );
}

export default MenuCategory;
