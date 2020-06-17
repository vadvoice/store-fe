import React from 'react';
import { PriceTag } from '../PriceTag/PriceTag';
import { AddToCart } from '../AddToCart/AddToCart';

import { FaProductHunt } from 'react-icons/fa';

import './ProductCardContent.scss';

const ProductCardContent = (props) => {
   const { product, actions, cartProducts } = props;
   if (!product) {
      return <></>;
   }

   const { imageUrl, title, description, status } = product;
   return (
      <div className="ProductCardContent">
         <div className="ProductCardContent__preview">
            {imageUrl ? <img src={imageUrl} alt={title} /> : <FaProductHunt />}
         </div>
         <div className="ProductCardContent__content">
            <header>
               <h1>
                  {title}
               </h1>
               <PriceTag product={product} />
            </header>
            <div className="ProductCardContent__content__description">
               <p>{description}</p>
            </div>
            <div className="ProductCardContent__content__actions">
               {status === 0 ? <AddToCart product={props.product} actions={{ ...actions }} cartProducts={cartProducts} /> : null}
            </div>
         </div>
      </div>
   );
}

export {
   ProductCardContent
}