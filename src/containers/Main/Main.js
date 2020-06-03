import React, { Component } from 'react';

import LogoIcon from '../../assets/images/logo.jpeg';

import './Main.scss';

class Main extends Component {
  redirectToChoicer = () => {
    this.props.history.push('/home')
  }
  render() {
    return <div className="Main">
      <img src={LogoIcon} alt={'logo'} />
    </div>
  }
}

export {
  Main
};