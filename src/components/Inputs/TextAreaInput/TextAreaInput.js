import React, { Component } from 'react';
import classNames from 'classnames';

import './TextAreaInput.scss';

class TextAreaInput extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  onChange({ target: { value } }) {
    const { onChange } = this.props;
    // trim input on the left
    const trimmedValue = value.replace(/^\s+/, '');

    onChange(trimmedValue);
  }

  render() {
    const { name, label, className } = this.props;

    return (
      <div className={classNames(className, 'common-input text-area-input')}>

        {label && (
          <label htmlFor={name}>{label}</label>
        )}
        <textarea
          {...this.props}
          id={name}
          type="text"
          onChange={this.onChange}
        />

      </div>
    );
  }
}

export { TextAreaInput };
