import React from 'react';
import { NavLink } from 'react-router-dom';

import './Routing.scss';

const Routing = (props) => {
  const { links } = props;

  return (
    <div className="Routing">
      {links.map((l) => (
        <NavLink
          key={l.link}
          to={`${l.link}`}
          className={({ isActive, isPending }) =>
            `Routing__btn ${isActive ? 'Routing__btn--active' : ''} ${
              isPending ? 'Routing__btn--pending' : ''
            }}`
          }
          title={l.label}
        >
          {l.title}
          {l.notify ? (
            <span className="Routing__btn__notify">{l.notify}</span>
          ) : null}
        </NavLink>
      ))}
    </div>
  );
};

export { Routing };
