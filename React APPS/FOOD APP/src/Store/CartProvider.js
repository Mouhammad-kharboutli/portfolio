import { useReducer } from "react";
import CartContext from "./CartContext";
import cartReducer from "./CartReducer";


const INTIALCARTSTATE = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
const [cartState,dispatchCartAction] = useReducer(cartReducer,INTIALCARTSTATE)
  const addItemToCartHandler = (item) => {
      dispatchCartAction({type:'ADD_ITEM',payload:item})
    };
    
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type:'REMOVE_ITEM',payload:id})
  };
  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
