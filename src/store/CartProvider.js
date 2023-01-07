import React, { useReducer } from 'react';
import CartContext from './CartContext';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;

      // Looking if the item already exists in the cart
      const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      // If true, accessing that item within items array by its index
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      // If item exists, create a new constant that takes that item, and adds to the amount
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        // Then we make a shallow copy of items array, and in the index of the existing item, replace with the upated item with updated amount
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // If the item doesn't exist, updatedItems equals the current items state + the added item
        updatedItems = state.items.concat(action.payload);
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case 'REMOVE_ITEM': {
      const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload);
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case 'CLEAR':
      return defaultCartState;

    default:
      return defaultCartState;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
