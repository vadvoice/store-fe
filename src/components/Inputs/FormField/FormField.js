import React from 'react';
import { Field } from 'react-final-form';
import { omit } from 'lodash/fp';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';

import './FormField.scss';

// use this to integrate inputs with final-form
const FormField = props => {
  const { name, label, disabled, errorInPopup, validate, validateFields } = props;

  return (
    <Field
      name={name}
      validate={validate}
      validateFields={validateFields ? validateFields : [name]}
      render={({ input, meta }) => {
        const error = meta.error || meta.submitError;
        return (
          <div className={classNames('form-field', { 'form-field--error': error && meta.touched })}>
            <props.component
              {...omit(['component', 'errorInPopup', 'validate', 'validateFields'], props)}
              {...input}
              label={label || input.name}
              disabled={disabled || meta.submitting}
              data-tip
              data-for={name}
            />
            {error && meta.touched && (
              errorInPopup
                ? <ReactTooltip id={name} getContent={() => error} place="right" type="dark" effect="solid" />
                : <div className="form-field--error__error-desc">{error}</div>
            )}
          </div>
        )
      }}
    />
  );

};

export { FormField };
