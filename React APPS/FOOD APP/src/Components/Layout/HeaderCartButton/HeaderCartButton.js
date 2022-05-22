import React, { useContext, useEffect,useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../../Cart/CartIcon/CartIcon";
import CartContext from "../../../Store/CartContext";

const HeaderCartButton = (props) => {
  const [btnAnimated,setBtnAnimated] = useState(false);
  const ctx = useContext(CartContext);
  const {items} = ctx;
  
  
  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
const btnClasses = `${styles.button} ${btnAnimated ? styles.bump : ''}` 
  useEffect(()=> {
    if (items.length === 0) {
      return ;
    }
    setBtnAnimated(true)
    const timer = setTimeout(() => {
      setBtnAnimated(false)
    },300)
    return () => {
      clearTimeout(timer)
    }
  },[items])

  return (
    <button className={btnClasses} onClick={props.onShowCartHandler}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span> Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
