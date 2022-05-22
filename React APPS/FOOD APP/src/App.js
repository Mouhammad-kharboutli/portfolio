import React, { useState } from "react";
import Header from "./Components/Layout/Header/Header";
import Meals from "./Components/Meal/Meals/Meals";
import Cart from "./Components/Cart/Cart/Cart";
import CartProvider from "./Store/CartProvider";


function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (

    <CartProvider>
       {cartIsShown && <Cart onCartHide={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </CartProvider>

  );
}

export default App;
