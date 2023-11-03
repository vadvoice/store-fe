import React from 'react';
import { Footer, AppHeader } from '../../components/Common';

import '../styles.scss';

const WithLayout = ({
  navigationMode = 'guest',
  accessRoles,
  children,
}) => {
  const isRouteAccessible =
    !accessRoles || (accessRoles && accessRoles.includes(navigationMode));

  return (
    <div id="wrapper" className="wrapper">
      <AppHeader />
      <main id="container" className="container">
        {isRouteAccessible && children}
      </main>
      <Footer />
    </div>
  );
};

export { WithLayout };
