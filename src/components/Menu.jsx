import React, { useState, useEffect } from "react";
import MenuCategory from "./MenuCategory";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch(`http://localhost:3000/menu/`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
      });
  }, []);

  const renderCategory = () => {
    if (category === "burgers") {
      return <MenuCategory menu={menu} filter={"burgers"} />;
    } else if (category === "sides") {
      return <MenuCategory menu={menu} filter={"sides"} />;
    } else if (category === "drinks") {
      return <MenuCategory menu={menu} filter={"drinks"} />;
    } else {
      return (
        <>
          <MenuCategory menu={menu} filter={"burgers"} />
          <MenuCategory menu={menu} filter={"sides"} />
          <MenuCategory menu={menu} filter={"drinks"} />
        </>
      );
    }
  };

  return (
    <>
      <div className="menu-container">
        <h1 className="text-font">Bun Drops Meny</h1>
        <div className="category-buttons">
          <button onClick={() => setCategory("all")}>Alla produkter</button>
          <button onClick={() => setCategory("burgers")}>Burgare</button>
          <button onClick={() => setCategory("sides")}>Tillbehör</button>
          <button onClick={() => setCategory("drinks")}>Dryck</button>
        </div>
        <div className="menu-list">{renderCategory()}</div>
      </div>
    </>
  );
}

export default Menu;
