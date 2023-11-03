import React from 'react';
import classNames from 'classnames';
import AboutVideoBackground from '../../assets/videos/about-background.mp4';

import './About.scss';
import { constants } from '../../config/constants.config';
import { Button } from '../../components/Common/Button/Button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      className={classNames({
        About: true,
      })}
    >
      <div className="About__background">
        <video src={AboutVideoBackground} autoPlay loop playsInline />
      </div>
      <div className="About__content">
        <h1>{constants.about.title}</h1>
        <p>{constants.about.subTitle}</p>
        <p>
          {constants.about.cooperation}{' '}
          <a href={`mailto:${constants.about.email}`}>
            {constants.about.email}
          </a>
        </p>
      </div>
      <div className="About__footer">
        <Button
          info
          label={constants.navigation.explore}
          onClick={() => navigate('/store')}
        />
        <Button
          label={constants.about.donateTitle}
          onClick={() => window.open(constants.links.donate, '_blank')}
        />
      </div>
    </div>
  );
};

export { About };
