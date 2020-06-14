import React from 'react'
import './CartItem.scss';
import { AddToCart } from '../../Products/AddToCart/AddToCart';

const CartItem = (props) => {
   const { product: { title, imageUrl, description, amount, currency }, cartProducts, actions } = props;
   return (
      <div className="CartItem">
         <img src={imageUrl} alt={title} />
         <div className="CartItem__info">
            <h2>{title}</h2>
            <p>{description}</p>
         </div>
         <div className="CartItem__price">
            <strong>{`${amount} ${currency}`}</strong>
         </div>
         <div className="CartItem__actions">
            <AddToCart product={props.product} cartProducts={cartProducts} actions={actions} />
         </div>
      </div>
   )
}

export {
   CartItem
}
