import React, { useState } from 'react'
import { CartItem } from './CartItem/CartItem';
import { Form } from 'react-final-form';
import {
   FormField,
   TextInput,
   NumberInput,
} from '../Inputs';
import {
   required,
} from '../Inputs/Validators';
import { Button } from '../Common';

import { FaShoppingCart } from 'react-icons/fa';
import { constants } from '../../config';

import './Cart.scss';

const Cart = (props) => {
   const [ isCheckoutVisible, setIsCheckoutVisible] = useState(false);
   const { cartProducts, actions } = props;
   const cartPriceAmount = cartProducts.reduce((acc, p) => acc + p.amount, 0);

   const renderCheckoutForm = () => {
      return <Form
            onSubmit={actions.onCheckout}
            initialValues={{
               price: cartPriceAmount
            }}
            render={({ handleSubmit, values, form, submitting }) => (
               <form onSubmit={handleSubmit}>
                  <div className="Cart__checkout__row">
                     <FormField
                        name="email"
                        label={constants.common.fields.email}
                        type="email"
                        component={TextInput}
                        validate={required}
                     />
                     <FormField
                        name="phone"
                        type="tel"
                        pattern="[+]{1}[0-9]{12}"
                        title="Phone in format +380638239194"
                        label={constants.common.fields.phone}
                        component={TextInput}
                        validate={required}
                     />
                  </div>
                  <div className="Cart__checkout__row">
                     <FormField
                        name="from"
                        label={constants.common.fields.userName}
                        component={TextInput}
                        validate={required}
                     />
                     <FormField
                        name="price"
                        disabled={true}
                        label={constants.common.fields.price}
                        component={NumberInput}
                     />

                  </div>
                  <FormField
                     name="comment"
                     label={constants.common.fields.comment}
                     component={TextInput}
                  />
                  <Button
                     submit
                     primary
                     disabled={submitting}
                     label={constants.common.fields.submit}
                  />
               </form>
            )}
         />
   }

   if (cartProducts && !cartProducts.length) {
      return <div className="Cart">
         <h3 className="Cart__no-records"><FaShoppingCart /> {constants.cart.noRecordsYet}</h3>
         <Button onClick={() => props.history.push('/store')} label="store" />
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
               <p><strong>{cartPriceAmount}</strong> USD</p>
            </div>
         </div>
         <div className="Cart__checkout">
            {!isCheckoutVisible ? <Button label={constants.common.fields.checkout} onClick={() => setIsCheckoutVisible(true)} /> : null}
            {isCheckoutVisible ? renderCheckoutForm() : null}
         </div>
      </div>
   )
}

export {
   Cart
}
