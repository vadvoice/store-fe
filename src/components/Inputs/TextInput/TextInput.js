import React, { Component } from 'react';
import classNames from 'classnames';

class TextInput extends Component {
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
    const { name, label, className, type } = this.props;

    return (
      <div className={classNames(className, 'common-input text-input')}>

        {label && (
          <label htmlFor={name}>{label}</label>
        )}
        <input
          {...this.props}
          id={name}
          type={type || "text"}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export { TextInput };
