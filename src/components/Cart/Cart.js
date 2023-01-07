import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/CartContext';
import Checkout from './Checkout';

const Cart = ({ hideCartHandler }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const orderHandler = e => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    try {
      await fetch('https://react-http-practice-54ed4-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        header: 'Content-Type: application/json',
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      });
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (err) {
      setIsSubmitting(false);
      console.log(err);
    }
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button
        onClick={hideCartHandler}
        className={classes['button--alt']}>
        Close
      </button>
      {hasItems && (
        <button
          className={classes.button}
          onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={hideCartHandler}
        />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button
          onClick={hideCartHandler}
          className={classes.button}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal hideCartHandler={hideCartHandler}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
