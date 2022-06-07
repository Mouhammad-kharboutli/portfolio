import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const nameInputValue = nameInputRef.current.value;
    const streetInputValue = streetInputRef.current.value;
    const postalInputValue = postalInputRef.current.value;
    const cityInputValue = cityInputRef.current.value;

    const nameInputIsValid = isEmpty(nameInputValue);
    const streetInputIsValid = isEmpty(streetInputValue);
    const cityInputIsValid = isEmpty(cityInputValue);
    const postalInputIsValid = isFiveChars(postalInputValue);

    const formIsValid =
      nameInputIsValid &&
      streetInputIsValid &&
      cityInputIsValid &&
      postalInputIsValid;

    setFormValidity({
      name: nameInputIsValid,
      city: cityInputIsValid,
      postal: postalInputIsValid,
      street: streetInputIsValid,
    });

    if (!formIsValid) {
      console.log("invalid");
      return;
    }

    // submit the form to firebase
    console.log(
      nameInputValue,
      streetInputValue,
      postalInputValue,
      cityInputValue
    );
    const userInfo = {
      name: nameInputValue,
      city: cityInputValue,
      postal: postalInputValue,
      street: streetInputValue,
    };
    props.onConfirm(userInfo);

    nameInputRef.current.value = "";
    cityInputRef.current.value = "";
    streetInputRef.current.value = "";
    postalInputRef.current.value = "";
  };
  const nameClasses = formValidity.name
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const cityClasses = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;
  const postalClasses = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    formValidity.postal ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && (
          <p className={classes.textError}>
            Please enter a valid name, not empty
          </p>
        )}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidity.street && (
          <p className={classes.textError}>
            Please enter a valid street, not empty
          </p>
        )}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formValidity.postal && (
          <p className={classes.textError}>
            Please enter a valid postal code, 5 characters
          </p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && (
          <p className={classes.textError}>
            Please enter a valid city, not empty
          </p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
