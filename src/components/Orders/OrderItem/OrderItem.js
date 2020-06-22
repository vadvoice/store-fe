import React from 'react';
import moment from 'moment';
import { Button } from '../../Common/Button/Button';
import { constants } from '../../../config';

import './OrderItem.scss'
import { StatusLabel } from '../../Common';

const OrderItem = (props) => {
   const { order } = props;

   return (
      <div className="OrderItem">
         <h1>{order.amount} {order.currency}</h1>
         {moment(order.createdAt).format('ll')}
         <div className="OrderItem__products">
            {order.products.map(prod => <div key={prod._id} className="OrderItem__products__product">
               <h3>{prod.title}</h3>
               <img src={prod.imageUrl} alt={prod.title} />
            </div>)}
         </div>
         {order.status === 0 ? <Button label={constants.common.actions.resolve} onClick={() => props.resolve(order._id)}/> : <StatusLabel>{constants.order.resolved}</StatusLabel> }
      </div>
   )
}

export {
   OrderItem
}
