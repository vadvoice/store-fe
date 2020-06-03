import React, { Component } from 'react';

import './NotFound.scss';

class NotFound extends Component {
  render() {
    return <div className="NotFound">
      <center>
        <h1>404</h1>
        <p>incorect request!</p>
      </center>
    </div>
  }
}

export {
  NotFound
}