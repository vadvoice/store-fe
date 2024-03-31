import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CheckboxInput.scss';

class CheckboxInput extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  onChange({ target: { checked } }) {
    this.props.onChange(checked);
  }

  render() {
    const { className, label, name, value } = this.props;

    return (
      <div className={classNames(className, 'common-input checkbox-input')}>
        <input
          {...this.props}
          id={name}
          type="checkbox"
          checked={value}
          value={name}
          onChange={this.onChange}
        />
        {label && (
          <label htmlFor={name}>{label}</label>
        )}
      </div>
    );
  }
}

CheckboxInput.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  value: PropTypes.bool
};

export { CheckboxInput };
