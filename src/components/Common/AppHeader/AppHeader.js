import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './AppHeader.scss';

class Header extends Component {
   render() {
      const redirectToMainPage = () => {
         this.props.history.push('/')
      }
      return <header className="AppHeader">
         <div onClick={redirectToMainPage} className={'header-logo'} />
      </header>
   }
}

const AppHeader = withRouter(Header);

export {
   AppHeader
}