import React from 'react';
import { AddToCart } from '../AddToCart/AddToCart';
import { ClapEffect } from '../ClapEffect/ClapEffect';

import { ImageGallery } from '../../Common';

import './ProductCardContent.scss';

const ProductCardContent = (props) => {
  const { product, actions, cartProducts, user } = props;
  if (!product) {
    return <></>;
  }

  const { imageUrl, title, description, status, gallery } = product;
  return (
    <div className="ProductCardContent">
      <div className="ProductCardContent__preview">
        <ImageGallery images={[{ name: title, url: imageUrl }, ...gallery]} />
      </div>
      <div className="ProductCardContent__content">
        <header>
          <h2>{title}</h2>
        </header>
        <div className="ProductCardContent__content__description">
          <p>{description}</p>
        </div>
        <div className="ProductCardContent__content__actions">
          <ClapEffect product={props.product} actions={actions} user={user} />
          {status === 0 ? (
            <AddToCart
              product={props.product}
              actions={{ ...actions }}
              cartProducts={cartProducts}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { ProductCardContent };
