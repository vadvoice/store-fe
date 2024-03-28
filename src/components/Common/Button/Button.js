import React from 'react';
import classNames from 'classnames';

import './Button.scss';

export const Button = ({ success, info, warning, danger, onClick, className, label, submit, icon, disabled, extraContent }) => (
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
    {icon ? <span className="common-btn__icon">{icon}</span> : null}
    {label}
    {extraContent ? <span className='common-btn__extra'>{extraContent}</span> : null}
  </button>
);
