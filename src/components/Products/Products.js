import React, { useState } from 'react';
import { ProductCard } from './ProductCard/ProductCard';
import { Modal } from '../Common';
import { ProductCardContent } from './ProductCardContent/ProductCardContent';
import './Products.scss';

const Products = (props) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState();
   const { products } = props;

   const selectProduct = (id) => {
      const selectedProduct = products.find(p => p._id === id);
      setSelectedProduct(selectedProduct);
      setIsModalOpen(true);
   }

   const requestClose = () => {
      setIsModalOpen(false);
   }

   return (
      <div className="Products">
         <div className="Products__content">
            {products.map((product, idx) => <ProductCard index={idx} selectProduct={selectProduct} key={product.title} product={product} />)}
         </div>

         <Modal
            onClose={requestClose}
            isModalOpen={isModalOpen}
            header="view"
         >
            <ProductCardContent product={selectedProduct} />
         </Modal>
      </div>
   )
}

export {
   Products
}
