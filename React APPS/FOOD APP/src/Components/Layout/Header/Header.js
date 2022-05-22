import React from "react";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";
import styles from "./Header.module.css";
import image from "./meals.jpg";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShowCartHandler ={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={image} alt="Meals" />
      </div>
    </>
  );
};

export default Header;
