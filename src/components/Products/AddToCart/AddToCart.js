import React from 'react';
import { Button } from '../../Common';
import { FaCartPlus } from 'react-icons/fa';
import { MdRemoveShoppingCart } from 'react-icons/md';

import './AddToCart.scss';

const AddToCart = (props) => {
   const { actions, product, cartProducts } = props;

   if (cartProducts && cartProducts.includes(product)) {
      return <Button icon={<MdRemoveShoppingCart />} label={"remove from cart"} danger onClick={e => actions.removeFromCart(product._id)} />
   }
   return (
      <Button icon={<FaCartPlus />} label={`add to cart`} onClick={e => actions.addToCart(product)} />
   )
}

export {
   AddToCart
}
