const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      // we need to group the items per item and then increase the amount of that item
      let updatedItems;
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };

    case "REMOVE_ITEM":
      
      const cartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
        );

      const cartItem = state.items[cartItemIndex];
      
      
      const updatedTotalAmountValue = state.totalAmount - cartItem.price; // amount is always one

      let updatedCartItems;
      if (cartItem.amount === 1) {
        updatedCartItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        const updatedItem = { ...cartItem, amount: cartItem.amount - 1 };
        updatedCartItems = [...state.items];
        updatedCartItems[cartItemIndex] = updatedItem;
      }

      return { items: updatedCartItems, totalAmount: updatedTotalAmountValue };

    default:
      return state;
  }
};
export default cartReducer;
