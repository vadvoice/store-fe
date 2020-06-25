import React from 'react';
import { PriceTag } from '../PriceTag/PriceTag';
import { AddToCart } from '../AddToCart/AddToCart';

import { ImageGallery } from '../../Common';

import './ProductCardContent.scss';

const ProductCardContent = (props) => {
   const { product, actions, cartProducts } = props;
   if (!product) {
      return <></>;
   }

   const { imageUrl, title, description, status, gallery } = product;
   return (
      <div className="ProductCardContent">
         <div className="ProductCardContent__preview">
            <ImageGallery images={[{name: title, url: imageUrl},...gallery]} />
         </div>
         <div className="ProductCardContent__content">
            <header>
               <h3>
                  {title}
               </h3>
            </header>
            <PriceTag product={product} />
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