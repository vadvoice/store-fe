import React, { Component } from 'react';
import classNames from 'classnames';
import './NumberInput.scss';

class NumberInput extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  onChange({ target: { value } }) {
    const { onChange } = this.props;
    onChange(Number(value));
  }

  render() {
    const { name, label, className } = this.props;

    return (
      <div className={classNames(className, 'common-input number-input')}>

        {label && (
          <label htmlFor={name}>{label}</label>
        )}
        <input
          {...this.props}
          id={name}
          type="number"
          onChange={this.onChange}
        />

      </div>
    );
  }
}

export { NumberInput };
