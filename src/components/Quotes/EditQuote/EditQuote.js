import React, { useState } from 'react';

import { Form } from 'react-final-form';
import { TextInput, FormField } from '../../../components/Inputs';
import { required } from '../../../components/Inputs/Validators';
import { Button } from '../../../components/Common';
import './EditQuote.scss';

const EditQuote = (props) => {
   const { quote, submit, deleteQuote, isEditing } = props;

   const [isEditingMode, setIsEditingMode] = useState(isEditing);

   const submitQuote = (values) => {
      submit(values);
   }
   if (isEditingMode) {
      return <div className="EditQuote">
         <Form
            onSubmit={(values) => {
               submitQuote(values);
               setIsEditingMode(false);
            }}
            initialValues={quote}
            render={
               ({ handleSubmit, submitting }) => <form
                  className="EditQuote__form"
                  onSubmit={handleSubmit}
               >
                  <div className="EditQuote__form__fields">
                     <FormField
                        disabled={submitting}
                        name={'text'}
                        placeholder={'text'}
                        label={'text'}
                        component={TextInput}
                        validate={required}
                     />
                     <FormField
                        disabled={submitting}
                        name={'author'}
                        placeholder={'author'}
                        label={'author'}
                        component={TextInput}
                     />
                  </div>

                  <div className="EditingСard__form__actions">
                     <Button
                        disabled={submitting}
                        success
                        submit
                        label="submit"
                     />
                     <Button
                        disabled={submitting}
                        type="button"
                        label="discard"
                        onClick={_ => setIsEditingMode(false)}
                     />
                  </div>
               </form>
            }
         />
      </div>
   }
   return <div className="EditQuote">
      <div className="EditQuote__view" >
         <h4>{quote.text || '"create quote"'}</h4>
         <Button label={'edit'} onClick={_ => setIsEditingMode(true)} />
         <Button danger label={'delete'} onClick={_ => deleteQuote(quote._id)} />
      </div>
   </div>
}

export { EditQuote };