import React, { useState } from 'react'
import { EditingСard } from './EditingСard/EditingСard';
import { Button } from '../Common/Button/Button';

import './ProductEditor.scss'

const ProductEditor = (props) => {
   const [isNewCardAdding, setIsNewCardEdding] = useState(false);

   const onSubmit = async (values) => {
      props.actions.sendProductData(values);
      setIsNewCardEdding(false);
   }

   const deleteProduct = (id) => {
      props.actions.deleteProduct(id);
   }
   const { products } = props;
   return (
      <div className="ProductEditor">
         {!isNewCardAdding ? <Button label="new" onClick={_ => setIsNewCardEdding(true)} /> : null}
         {isNewCardAdding ? <EditingСard product={{}} actions={{ onSubmit }} isEdit={true} /> : null}

         {products.map(product => <EditingСard key={product.title} product={product} actions={{ onSubmit, onDelete: deleteProduct }} />)}
      </div>
   )
}

export {
   ProductEditor
}
