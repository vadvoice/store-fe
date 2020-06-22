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
        {orders.map(order => <OrderItem key={order._id} order={order} resolve={props.actions.resolveOrder} />)}
      </div>
   )
}

export {
   Orders
}