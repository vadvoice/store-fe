import React from 'react';
import { PriceTag } from '../PriceTag/PriceTag';
import { AddToCart } from '../AddToCart/AddToCart';

import './ProductCardContent.scss';

const ProductCardContent = (props) => {
   const { product, actions, cartProducts } = props;
   if (!product) {
      return <></>;
   }

   const { imageUrl, title, description, amount, currency } = product;
   return (
      <div className="ProductCardContent">
         <div className="ProductCardContent__preview">
            <img src={imageUrl} alt={title} />
         </div>
         <div className="ProductCardContent__content">
            <h1>{title}</h1>
            <p>{description}</p>
            <PriceTag product={product} />
            <AddToCart product={props.product} actions={{ ...actions }} cartProducts={cartProducts} />
         </div>
      </div>
   );
}

export {
   ProductCardContent
}