import React, {useContext} from 'react';
import MealItemForm from './MealItemForm/MealItemForm';
import CartContext from '../../../Store/CartContext';

import classes from "./MealItem.module.css"

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const {name,description} = props;
    const price = `$${props.price.toFixed(2)}`; 
    const addToCartHandler = amount => {
      // console.log('he',{
      //   id:props.id,
      //   name:props.name,
      //   amount:amount,
      //   price:props.price
      // })
      cartCtx.addItem({
        id:props.id,
        name:props.name,
        amount:amount,
        price:+(props.price)
      })
    }
  return (
    <li className={classes.meal}>
        <div>
            <h3>{name}</h3>
            <div className={classes.description}>{description}</div>
            <div className={classes.price}>{price}</div>

        </div>
        <div><MealItemForm id={props.id} onAddToCart={addToCartHandler}/></div>
    </li>
  )
}

export default MealItem