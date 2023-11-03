import React from 'react';
import { Button } from '../Button/Button';

import './NotFound.scss';
import { constants } from '../../../config';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="NotFound">
      <div title="404">404</div>
      <p>Page not found!</p>
      <Button label={constants.navigation.home} onClick={() => navigate('/')} />
    </div>
  );
};

export { NotFound };
