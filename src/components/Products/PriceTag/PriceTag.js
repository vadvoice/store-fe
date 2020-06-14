import React from 'react'
import { constants } from '../../../config';

import './PriceTag.scss';

const PriceTag = (props) => {
   const { amount, currency, status } = props.product;
   return (
      <div className="PriceTag">
         {
            status !== 0
            ? <span>{constants.product.soldOut}</span>
            : <span>{`${amount} ${currency}`}</span>
         }
      </div>
   )
}

export {
   PriceTag
}
