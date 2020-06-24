import React, { Component } from 'react';
import { Button } from '../Button/Button';

import './NotFound.scss';
import { constants } from '../../../config';

class NotFound extends Component {
  render() {
    return <div className="NotFound">
      <div title="404">
        404
      </div>
      <p>incorect request!</p>
      <Button label={constants.navigation.home} onClick={() => this.props.history.push('/')} />
    </div>
  }
}

export {
  NotFound
}