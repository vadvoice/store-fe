import React from 'react';
import { Footer, AppHeader } from '../../components/Common';

import '../styles.scss';

const FullSizeLayout = ({
  navigationMode = 'guest',
  accessRoles,
  children,
}) => {
  const isRouteAccessible =
    !accessRoles || (accessRoles && accessRoles.includes(navigationMode));

  return (
    <div id="wrapper" className="wrapper">
      <AppHeader fullsize />
      <main id="container" className="container--fullsize">
        {isRouteAccessible && children}
      </main>
      <Footer />
    </div>
  );
};

export { FullSizeLayout };
