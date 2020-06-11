import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { TextInput, ImageInput, FormField } from '../../../components/Inputs';
import { Button } from '../../../components/Common';
import { required } from '../../../components/Inputs/Validators';

import './EditingСard.scss';

function EditingСard(props) {
   const { product: { _id, imageUrl, title, description }, actions: { onSubmit, onDelete }, isEdit } = props;

   const [isEditingMode, setIsEditingMode] = useState(isEdit);

   const renderViewMode = () => {
      return <div>
         <img src={imageUrl} alt={title} />
         <h4>{title}</h4>
         <p>{description}</p>
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
         </div>
      </div>
   };

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
                  name={'description'}
                  placeholder={'description'}
                  label={'description'}
                  component={TextInput}
                  validate={required}
               />
               <FormField
                  name={'image'}
                  label={'image'}
                  component={ImageInput}
               />
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

