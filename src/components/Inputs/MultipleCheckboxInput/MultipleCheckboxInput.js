import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CheckboxInput } from '../CheckboxInput/CheckboxInput';
import './MultipleCheckboxInput.scss';

class MultipleCheckboxInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(checked, enumValue) {
    const { onChange, value } = this.props;
    if (checked) {
      return onChange([...value, enumValue]);
    }
    onChange(value.filter(el => el !== enumValue));
  }

  render() {
    const { className, label, renderLabel, value, enums, vertical, disabled } = this.props;

    return (
      <div className={classNames(className, 'common-input', 'multiple-checkbox-input')}>
        {renderLabel && renderLabel()}
        {!renderLabel && label && (
          <label>{label}</label>
        )}
        <div className={classNames(
          'multiple-checkbox-input__inputs',
          { 'multiple-checkbox-input__inputs--vertical': vertical },
        )}>
          {enums.map(el => (
            <div key={el.value}>
              <CheckboxInput
                disabled={disabled}
                name={el.value}
                label={el.label}
                value={value.includes(el.value)}
                onChange={(value) => this.onChange(value, el.value)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

MultipleCheckboxInput.propTypes = {
  enums: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })).isRequired
};

export { MultipleCheckboxInput };
