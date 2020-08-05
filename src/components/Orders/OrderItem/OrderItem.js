import React from 'react';
import moment from 'moment';
import { Button } from '../../Common/Button/Button';
import { constants } from '../../../config';

import './OrderItem.scss'
import { StatusLabel } from '../../Common';
import InfoRow from '../../Common/InfoRow/InfoRow';

const OrderItem = (props) => {
   const { order, actions } = props;

   const renderActions = () => {
      if (order.status === 0) {
         return <>
            <Button success label={constants.common.actions.resolve} onClick={() => actions.resolveOrder(order._id)}/>
            <Button danger label={constants.common.actions.reject} onClick={() => actions.rejectOrder(order._id)}/>
         </>
      } else if (order.status === 1) {
         return <StatusLabel>{constants.order.resolved}</StatusLabel> 
      } else if (order.status === 2) {
         return <StatusLabel>{constants.order.rejected}</StatusLabel> 
      }
   }
   return (
      <div className="OrderItem">
         <h1>{order.amount} {order.currency}</h1>
         {moment(order.createdAt).format('ll')}
         <InfoRow data={{ name: 'name', value: order.from }} />
         <InfoRow data={{ name: 'email', value: order.email }} />
         <InfoRow data={{ name: 'phone', value: order.phone }} />
         <div className="OrderItem__products">
            {order.products.map(prod => <div key={prod._id} className="OrderItem__products__product">
               <h3>{prod.title}</h3>
               <img src={prod.imageUrl} alt={prod.title} />
            </div>)}
         </div>
         {renderActions()}
      </div>
   )
}

export {
   OrderItem
}
