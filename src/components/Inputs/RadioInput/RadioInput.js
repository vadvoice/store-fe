import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omit } from 'lodash/fp';

import './RadioInput.scss'

class RadioInput extends Component {
  render() {
    const { className, label, value, options, onChange } = this.props

    return (
      <div className={classNames(className, 'common-input multiple-radio-input')}>

        {label && (
          <label>{label}</label>
        )}

        <div className="multiple-radio-input__options">
          {options.map(el => <div key={el.value}>
            {el.label && (
              <label htmlFor={`radio-${el.value}`}>{el.label}</label>
            )}
            <input
                {...omit(['options'], this.props)}
                id={`radio-${el.value}`}
                type="radio"
                value={el.value}
                checked={el.value === value}
                onChange={() => onChange(el.value)}
            />

          </div>)}
        </div>
      </div>
    );
  }
}

RadioInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired
};

export { RadioInput };
