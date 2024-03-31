import React, { useState } from 'react'
import { CartItem } from './CartItem/CartItem';
import { Form } from 'react-final-form';
import {
   FormField,
   TextInput,
   NumberInput,
   TextAreaInput,
} from '../Inputs';
import {
   required,
} from '../Inputs/Validators';
import { Button } from '../Common';

import { FaShoppingCart } from 'react-icons/fa';
import { constants } from '../../config';

import './Cart.scss';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
   const [ isCheckoutVisible, setIsCheckoutVisible ] = useState(false);
   const { cartProducts = [], actions } = props;
   const cartPriceAmount = cartProducts.reduce((acc, p) => acc + p.amount, 0);
   const navigate = useNavigate();

   const renderCheckoutForm = () => {
      return <Form
            onSubmit={actions.onCheckout}
            initialValues={{
               price: cartPriceAmount
            }}
            render={({ handleSubmit, submitting }) => (
               <form onSubmit={handleSubmit}>
                  <div className="Cart__checkout__row">
                     <FormField
                        name="email"
                        placeholder="Email"
                        label={`${constants.common.fields.email} *`}
                        type="email"
                        component={TextInput}
                        validate={required}
                     />
                  </div>
                  <div className="Cart__checkout__row">
                     <FormField
                        name="from"
                        label={constants.common.fields.userName}
                        component={TextInput}
                     />
                     <FormField
                        name="price"
                        disabled={true}
                        label={`${constants.common.fields.price} ($) *`}
                        component={NumberInput}
                     />
                  </div>
                  <FormField
                     name="comment"
                     label={constants.common.fields.comment}
                     component={TextAreaInput}
                  />
                  <div className="Cart__checkout__actions">
                     <Button
                        success
                        submit
                        primary
                        disabled={submitting}
                        label={constants.common.actions.submit}
                     />
                     <Button
                        primary
                        disabled={submitting}
                        label={constants.common.actions.cancel}
                        onClick={() => setIsCheckoutVisible(false)}
                     />
                  </div>
               </form>
            )}
         />
   }

   if (cartProducts && !cartProducts.length) {
      return <div className="Cart">
         <h3 className="Cart__no-records"><FaShoppingCart /> {constants.cart.noRecordsYet}</h3>
         <Button onClick={() => navigate('/store')} label="store" />
      </div>
   }
   return (
      <div className="Cart">
         <div className="Cart__products">
            <h2>{constants.cart.selectedProducts}</h2>
            {cartProducts.map(p => {
               return <CartItem key={p.title} cartProducts={cartProducts} product={p} actions={actions} />
            })}
            <div className="Cart__total">
               <p>{constants.cart.total} <strong>{cartPriceAmount}</strong> USD</p>
            </div>
         </div>
         <div className="Cart__checkout">
            {!isCheckoutVisible ? <Button info label={constants.common.fields.checkout} onClick={() => setIsCheckoutVisible(true)} /> : null}
            {isCheckoutVisible ? renderCheckoutForm() : null}
         </div>
      </div>
   )
}

export {
   Cart
}
