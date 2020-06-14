import React from 'react'
import { CartItem } from './CartItem/CartItem';
import { Form } from 'react-final-form';
import {
   FormField,
   TextInput,
} from '../Inputs';
import {
   required,
} from '../Inputs/Validators';
import { Button } from '../Common';

const Cart = (props) => {
   const { cartProducts, actions } = props;

   if (cartProducts && !cartProducts.length) {
      return <div className="Cart">
         <h3>no records yet</h3>
      </div>
   }
   return (
      <div className="Cart">
         <div className="Cart__products">
            {cartProducts.map(p => {
               return <CartItem key={p.title} cartProducts={cartProducts} product={p} actions={actions} />
            })}
         </div>

         <div className="Cart__checkout">
            <Form
               onSubmit={actions.onCheckout}
               initialValues={{}}
               render={({ handleSubmit, values, form, submitting }) => (
                  <form onSubmit={handleSubmit}>
                     <FormField
                        name="email"
                        type="email"
                        component={TextInput}
                        validate={required}
                     />
                     <FormField
                        name="from"
                        component={TextInput}
                        validate={required}
                     />
                      <FormField
                        name="comment"
                        component={TextInput}
                     />

                     <Button
                        submit
                        primary
                        disabled={submitting}
                        label="checkout"
                     />
                  </form>
               )}
            />
         </div>
      </div>
   )
}

export {
   Cart
}
