import React from 'react'
import './PriceTag.scss';

const PriceTag = (props) => {
   const { amount, currency } = props;
   return (
      <div className="PriceTag">
         <span>{`${amount} ${currency}`}</span>
      </div>
   )
}

export {
   PriceTag
}
