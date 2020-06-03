import React, { Component } from 'react';
import classNames from 'classnames';
import { merge } from 'lodash/fp';

import { DateInput } from '../DateInput/DateInput';

import './DateRangeInput.scss';

class DateRangeInput extends Component {
  changeDate(name, date) {
    const { value, onChange } = this.props;

    onChange(merge(value, { [name]: date }));
  }

  render() {
    const { value: { start, end }, label, startLabel, endLabel, className, disabled, vertical } = this.props;

    return (
      <div className={classNames(className, 'hme-input date-range-input')}>
        {label && (
          <label>{label}</label>
        )}
        <div className={classNames('date-range-input__inputs', { 'date-range-input__inputs--vertical': vertical })}>
          <DateInput
            name="start"
            value={start}
            label={startLabel}
            onChange={value => this.changeDate('start', value)}
            disabled={disabled}
          />
          <DateInput
            name="end"
            value={end}
            label={endLabel}
            onChange={value => this.changeDate('end', value)}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}

export { DateRangeInput };