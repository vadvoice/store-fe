import React from 'react';
import classNames from 'classnames';

import './Button.scss';

export const Button = ({ success, info, warning, danger, onClick, className, label, submit, icon, disabled }) => (
  <button
    className={classNames(
      className,
      'common-btn',
      {
        'common-btn--success': success,
        'common-btn--info': info,
        'common-btn--warning': warning,
        'common-btn--danger': danger,
        'common-btn--disabled': disabled,
      },
    )}
    onClick={onClick}
    type={submit ? 'submit' : 'button'}
    disabled={disabled}
  >
    {icon ? icon : null}
    {label}
  </button>
);
