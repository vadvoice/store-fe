import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Routing.scss';

class Routing extends Component {
  render() {
    const { links, path } = this.props;
    return (
      <div className="Routing">
        {
          links.map(l => 
            <NavLink
              key={l.link}
              to={`${path.length > 1 ? path : ''}/${l.link}`}
              exact={l.exact}
              className="Routing__btn"
              activeClassName={"Routing__btn--active"}
            >{l.title}</NavLink>
          )
        }
      </div>
    )
  }
};

export {
  Routing,
}