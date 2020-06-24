import React from 'react';
import classNames from 'classnames';
import AboutVideoBackground from '../../assets/videos/about-background.mp4';

import './About.scss';
import { constants } from '../../config/constants.config';
import { Button } from '../../components/Common/Button/Button';

const About = (props) => {
   const { history } = props;
   return <div className={classNames({
      'About': true,
   })}>
      <div className="About__background">
         <video src={AboutVideoBackground} autoPlay loop />
      </div>
      <div className="About__content">
         <h1>{constants.about.title}</h1>
         <p>{constants.about.subTitle}</p>
      </div>
      <div className="About__footer">
         <Button label={constants.navigation.explore} onClick={() => history.push('/store') } />
      </div>
   </div>
}

export {
   About
};