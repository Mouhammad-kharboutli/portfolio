import React, { useRef, useState } from "react";
import Input from "../../../UI/Input/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountAsNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountAsNumber > 5 ||
      enteredAmountAsNumber < 1
    ) {
      setAmountIsValid(false);
      setTimeout(()=> {
        setAmountIsValid(true);
      },3000)
      return;
    }
    
    props.onAddToCart(enteredAmountAsNumber);
    amountInputRef.current.value = '';
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p className={classes.redText}>Please enter a valid amount (1-5) </p>}
    </form>
  );
};

export default MealItemForm;
