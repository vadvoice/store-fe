import React from 'react';
import './ProductCardContent.scss';

const ProductCardContent = (props) => {
   const { product } = props;
   if (!product) {
      return <></>;
   }
   const { imageUrl, title, description } = product;
   return (
      <div className="ProductCardContent">
         <div className="ProductCardContent__preview">
            <img src={imageUrl} alt={title} />
         </div>
         <div className="ProductCardContent__content">
            <h1>{title}</h1>
            <p>{description}</p>
         </div>
      </div>
   );
}

export {
   ProductCardContent
}