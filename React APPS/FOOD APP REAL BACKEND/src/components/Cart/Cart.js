import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout/Checkout";

const Cart = (props) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const clickHandler = () => {
    setIsOrdered(true);
  };

  const onConfirmHandler = async (userData) => {
    setIsSubmitting(true);
    const sendRequest = await fetch(
      "https://react-tasks-4b15c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );

    const res = await sendRequest;
    if (res.ok) {
      setDidSubmitted(true);
      setIsSubmitting(false);
      cartCtx.clearCart();
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalButtons = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={clickHandler}>
          Order
        </button>
      )}
    </div>
  );
  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrdered && (
        <Checkout onConfirm={onConfirmHandler} onCancel={props.onClose} />
      )}
      {!isOrdered && modalButtons}
    </>
  );
  const modalSubmitting = (
    <>
      <p>Order is submitting ...</p>
    </>
  );
  const modalHasSubmittedSuccessfully = (
    <>
      <p>
        Order has sent successfully , we contact you when your order is done. 
      </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmitted && modalContent}
      {isSubmitting && !didSubmitted && modalSubmitting}
      {didSubmitted && modalHasSubmittedSuccessfully}
    </Modal>
  );
};

export default Cart;
