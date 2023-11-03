import React, { useState, useEffect } from 'react'
import { EditingСard } from './EditingСard/EditingСard';
import { Button } from '../Common/Button/Button';

import './ProductEditor.scss'

const ProductEditor = (props) => {
   const [isNewCardAdding, setIsNewCardEdding] = useState(false);
   const { fetchData, onGalleryItemDelete } = props.actions;

   useEffect(() => {
      fetchData();
   }, [fetchData])

   const onSubmit = async (values) => {
      props.actions.sendProductData(values);
      setIsNewCardEdding(false);
   }

   const deleteProduct = (id) => {
      props.actions.deleteProduct(id);
   }

   const markProduct = (id, mark) => {
      props.actions.markProduct(id, mark);
   }
   const { products } = props;
   return (
      <div className="ProductEditor">
         <div className="ProductEditor__actions">
            {!isNewCardAdding ? <Button label="new" onClick={() => setIsNewCardEdding(true)} /> : null}
            {isNewCardAdding ? <EditingСard product={{ status: 1 }} actions={{ onSubmit, onDelete: deleteProduct, onGalleryItemDelete: onGalleryItemDelete }} isEdit={true} /> : null}
         </div>

         <div className="ProductEditor__cards">
            {products.map(product => <EditingСard key={product.title} product={product} actions={{ onSubmit, onDelete: deleteProduct, markProduct, onGalleryItemDelete: onGalleryItemDelete }} />)}
         </div>
      </div>
   )
}

export {
   ProductEditor
}
