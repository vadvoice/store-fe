import React, { Component } from 'react';

import LogoIcon from '../../assets/images/logo.jpeg';

import './Main.scss';

class Main extends Component {
  redirectToStore = () => {
    this.props.history.push('/store')
  }
  render() {
    return <div className="Main">
      <img src={LogoIcon} alt={'logo'} />
      <button onClick={this.redirectToStore}>
        go to store
      </button>
    </div>
  }
}

export {
  Main
};