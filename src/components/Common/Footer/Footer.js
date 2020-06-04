import React, { Component } from 'react';
import { constants } from '../../../config';

import './Footer.scss';

class Footer extends Component {
  render() {
    return <footer className="Footer">
      <small>{constants.copyright}</small>
    </footer>
  }
}

export {
  Footer,
}