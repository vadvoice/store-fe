import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { omit } from 'lodash/fp';

import './SelectInput.scss'

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange({ target: { value, selectedOptions } }) {
    const { onChange, multiple } = this.props;
    const selectedOptsArr = [].slice.call(selectedOptions);

    onChange(multiple ? selectedOptsArr.map(el => el.value) : value);
  }

  render() {
    const { className, value, label, multiple, options, allowEmpty, size } = this.props;

    return (
      <div className={classNames(className, 'common-input select-input')}>
        {label && (
          <label htmlFor={label}>{label}</label>
        )}
        <select
          {...omit(['options'], this.props)}
          value={multiple ? value || [] : value}
          multiple={multiple}
          size={size}
          onChange={this.onChange}
        >
          {(!multiple && allowEmpty) && <option value="">-</option>}

          {options.map(opt => <option
              key={opt.value}
              value={opt.value}
            >{opt.label}</option>)
          }
        </select>
      </div>
    );
  }
}

SelectInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })).isRequired
};

export { SelectInput };
