import React, { useEffect } from 'react'
import { ProductCard } from './ProductCard/ProductCard';
import './Products.scss'

const Products = (props) => {
   useEffect(() => {
      props.fetchData();
      return () => {
         console.log('unmount')
      }
   }, [])
   const { products } = props;
   return (
      <div className="Products">
         {products.map(product => <ProductCard key={product.title} product={product} />)}
      </div>
   )
}

export {
   Products
}
