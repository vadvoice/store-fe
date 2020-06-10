import React from 'react';
import { Form } from 'react-final-form';
import {
   FormField,
   TextInput,
} from '../Inputs';
import {
   required,
} from '../Inputs/Validators';
import { Button } from '../Common';

import './AuthLogin.scss';

class AuthLogin extends React.Component {
   submitForm = (values) => {
      const { actions: { submit } } = this.props;
      return submit(values);
   }
   render() {
      return (
         <Form
            onSubmit={this.submitForm}
            initialValues={{}}
            render={({ handleSubmit, values, form, submitting }) => (
               <form onSubmit={handleSubmit}>
                  <FormField
                     name="email"
                     type="email"
                     component={TextInput}
                     validate={required}
                  />
                  <FormField
                     name="password"
                     type="password"
                     component={TextInput}
                     validate={required}
                  />

                  <Button
                     submit
                     primary
                     disabled={submitting}
                     label="send"
                  />
               </form>
            )}
         />
      );
   }
}

export {
   AuthLogin
}