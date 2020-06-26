import React, { useEffect } from 'react';

import { OrderItem } from './OrderItem/OrderItem';

import './Orders.scss'

const Orders = (props) => {
   const { actions: { fetchData } } = props;
   useEffect(() => {
      fetchData();
   }, [fetchData])

   const { orders } = props;
   return (
      <div className="Orders">
         {
            orders.length
            ? orders.map(order => <OrderItem key={order._id} order={order} actions={props.actions} />)
            : <h4>not orders yet</h4>
         }
      </div>
   )
}

export {
   Orders
}
