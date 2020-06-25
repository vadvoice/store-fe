import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard/ProductCard';
import { Modal } from '../Common';
import { ProductCardContent } from './ProductCardContent/ProductCardContent';
import './Products.scss';

const Products = (props) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState();
   const { products, actions, cartProducts } = props;
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
            {products.map((product, idx) => <ProductCard index={idx} key={product.title} product={product} actions={{ selectProduct, ...actions }} cartProducts={cartProducts} />)}
         </div>

         <Modal
            onClose={requestClose}
            isModalOpen={isModalOpen}
            header="view"
         >
            <ProductCardContent product={selectedProduct} actions={{...actions}} cartProducts={cartProducts} />
         </Modal>
      </div>
   )
}

export {
   Products
}
