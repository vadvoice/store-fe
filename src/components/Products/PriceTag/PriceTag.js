import React from 'react';
import { constants } from '../../../config';
import classNames from 'classnames';

import './PriceTag.scss';

const PriceTag = (props) => {
  const { amount, currency, status } = props.product;

  const readableStatus = {
    0: 'available',
    1: 'soldOut',
  };

  return (
    <div
      className={classNames(`PriceTag--${readableStatus[status]}`, {
        PriceTag: true,
        'PriceTag--soldOut': status !== 0,
      })}
    >
      {status !== 0 ? (
        <span>{constants.product.soldOut}</span>
      ) : (
        <span>{`${amount} ${currency}`}</span>
      )}
    </div>
  );
};

export { PriceTag };
