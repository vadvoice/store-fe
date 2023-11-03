import React from 'react';
import { Footer, AppHeader } from '../../components/Common';

import '../styles.scss';

const FullSizeLayout = ({
  component,
  navigationMode = 'guest',
  accessRoles,
  children,
  ...rest
}) => {
  const isRouteAccessible =
    !accessRoles || (accessRoles && accessRoles.includes(navigationMode));

  return (
    <div id="wrapper" className="wrapper">
      <AppHeader fullsize />
      <main id="container" className="container--fullsize">
        {isRouteAccessible && children}
        {/* {isRouteAccessible ? (
          <Route {...rest} element={component} />
        ) : (
          <Route {...rest} element={NotFound} />
        )} */}
      </main>
      <Footer />
    </div>
  );
};

export { FullSizeLayout };
