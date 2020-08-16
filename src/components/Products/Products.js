import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard/ProductCard';
import { Modal } from '../Common';
import { ProductCardContent } from './ProductCardContent/ProductCardContent';
import './Products.scss';

const Products = (props) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState();
   const { products, actions, cartProducts, user } = props;
   const { fetchData } = actions;

   useEffect(() => {
      fetchData();
   }, [fetchData])

   const selectProduct = (id) => {
      const selectedProduct = products.find(p => p._id === id);
      setSelectedProduct(selectedProduct);
      setIsModalOpen(true);
   }

   const requestClose = () => {
      setSelectedProduct(null);
      setIsModalOpen(false);
   }

   return (
      <div className="Products">
         <div className="Products__content">
            {props.products.length ? props.products.map((product, idx) => <ProductCard index={idx} key={product.title} product={product} actions={{ selectProduct, ...actions }} cartProducts={cartProducts} />) : 'no products yet'}
         </div>

         <Modal
            onClose={requestClose}
            isModalOpen={isModalOpen}
            header={`${selectedProduct && selectedProduct.title}`}
         >
            <ProductCardContent product={selectedProduct} actions={{...actions}} cartProducts={cartProducts} user={user} />
         </Modal>
      </div>
   )
}

export {
   Products
}
