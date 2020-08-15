import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { TextInput, ImageInput, FormField, NumberInput, CheckboxInput } from '../../../components/Inputs';
import { Button } from '../../../components/Common';
import { required } from '../../../components/Inputs/Validators';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import './EditingСard.scss';
import { PriceTag } from '../../Products/PriceTag/PriceTag';

function EditingСard(props) {
   const { product: { _id, imageUrl, title, description, amount, mark }, actions: { onSubmit, onDelete, markProduct, onGalleryItemDelete }, isEdit } = props;

   const [isEditingMode, setIsEditingMode] = useState(isEdit);

   const renderViewMode = () => {
      return <div>
         <img className={'EditingСard__img'} src={imageUrl} alt={title} />
         <h4>{title}</h4>
         <p>{description}</p>
         <p>{amount}</p>
         <div>
            <Button
               label={'edit'}
               onClick={() => setIsEditingMode(true)}
            />
            {
               _id
                  ? <Button
                     label={'delete'}
                     onClick={() => onDelete(_id)}
                     danger
                  />
                  : null
            }
            {
               markProduct
                  ? <Button
                     label={mark === 0 ? 'deactivate' : 'activate'}
                     onClick={() => markProduct(_id, mark === 0 ? 1 : 0)}
                     danger={mark === 0}
                     success={mark > 0}
                  />
                  : null
            }
         </div>
      </div>
   };

   const editGallery = (gallery = []) => {
      return <div className="EditingСard__form__gallery">
         {
            gallery.map(galleryItem => {
               return <div key={galleryItem._id} className="EditingСard__form__gallery__item">
                  <i onClick={_ => {
                     onGalleryItemDelete(props.product._id, galleryItem.name);
                     setIsEditingMode(false);
                  }}><AiOutlineCloseCircle /></i>
                  <img width={40} src={galleryItem.url} alt={galleryItem._id} />
               </div>
            })
         }
      </div>
   }

   const renderEditMode = () => {
      return <Form
         onSubmit={(values) => {
            onSubmit(values);
            setIsEditingMode(false);
         }}
         initialValues={props.product}
         render={
            ({ handleSubmit, form, values, submitting }) => <form
               className="EditingСard__form"
               onSubmit={handleSubmit}
            >
               <FormField
                  name={'title'}
                  placeholder={'title'}
                  label={'title'}
                  component={TextInput}
                  validate={required}
               />
               <FormField
                  name={'status'}
                  placeholder={'is bought'}
                  label={'is bought'}
                  component={NumberInput}
                  min="0"
                  max="1"
               />
               <PriceTag product={values} />
               <FormField
                  name={'description'}
                  placeholder={'description'}
                  label={'description'}
                  component={TextInput}
               />
               <FormField
                  name={'amount'}
                  placeholder={'amount'}
                  label={'amount'}
                  component={NumberInput}
                  validate={required}
               />
               <FormField
                  name={'image'}
                  label={'image'}
                  component={ImageInput}
               />
               <FormField
                  name={'gallery'}
                  label={'gallery'}
                  multiple
                  component={ImageInput}
               />
               {editGallery(props.product && props.product.gallery)}
               <div className="EditingСard__form__actions">
                  <Button
                     submit
                     label="submit"
                  />
                  <Button
                     type="button"
                     label="discard"
                     onClick={_ => setIsEditingMode(false)}
                  />
               </div>
            </form>
         }
      />
   }

   return (
      <div className="EditingСard">
         {isEditingMode ? renderEditMode() : renderViewMode()}
      </div>
   )
}

export {
   EditingСard
};

