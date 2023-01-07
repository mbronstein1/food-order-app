import React, { useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = ({ onCancel }) => {
  const [userInput, setUserInput] = useState({
    name: '',
    street: '',
    postalCode: '',
    city: '',
  });

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: false,
    street: false,
    city: false,
    postalCode: false,
  });

  const [isTouched, setIsTouched] = useState({
    name: false,
    street: false,
    city: false,
    postalCode: false,
  });

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    if (name === 'postalCode') {
      setFormInputsValidity({ ...formInputsValidity, postalCode: isFiveChars(userInput.postalCode) });
    } else {
      setFormInputsValidity({ ...formInputsValidity, [name]: !isEmpty(userInput[name]) });
    }
  };

  const onBlurHandler = e => {
    const { name } = e.target;
    setIsTouched({ ...isTouched, [name]: true });
    if (name === 'postalCode') {
      setFormInputsValidity({ ...formInputsValidity, postalCode: isFiveChars(userInput.postalCode) });
    } else {
      setFormInputsValidity({ ...formInputsValidity, [name]: !isEmpty(userInput[name]) });
    }
  };

  const confirmHandler = event => {
    event.preventDefault();
    setIsTouched({ name: true, street: true, city: true, postalCode: true });

    const enteredName = userInput.name;
    const enteredStreet = userInput.street;
    const enteredPostalCode = userInput.postalCode;
    const enteredCity = userInput.city;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({ name: enteredNameIsValid, street: enteredStreetIsValid, city: enteredCityIsValid, postalCode: enteredPostalCodeIsValid });

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name && isTouched.name ? classes.valid : ''} ${!formInputsValidity.name && isTouched.name ? classes.invalid : ''}`}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={onChangeHandler}
          name='name'
          onBlur={onBlurHandler}
        />
        {!formInputsValidity.name && isTouched.name && <p>Please entered a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${formInputsValidity.street && isTouched.street ? classes.valid : ''} ${
          !formInputsValidity.street && isTouched.street ? classes.invalid : ''
        }`}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          onChange={onChangeHandler}
          name='street'
          onBlur={onBlurHandler}
        />
        {!formInputsValidity.street && isTouched.street && <p>Please entered a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${formInputsValidity.postalCode && isTouched.postalCode ? classes.valid : ''} ${
          !formInputsValidity.postalCode && isTouched.postalCode ? classes.invalid : ''
        }`}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          onChange={onChangeHandler}
          name='postalCode'
          onBlur={onBlurHandler}
        />
        {!formInputsValidity.postalCode && isTouched.postalCode && <p>Please entered a valid postal code (5 characters long)!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city && isTouched.city ? classes.valid : ''} ${!formInputsValidity.city && isTouched.city ? classes.invalid : ''}`}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          onChange={onChangeHandler}
          name='city'
          onBlur={onBlurHandler}
        />
        {!formInputsValidity.city && isTouched.city && <p>Please entered a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button
          type='button'
          onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
