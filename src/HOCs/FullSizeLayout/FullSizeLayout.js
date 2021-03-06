import React from 'react';
import { Route } from 'react-router-dom';
import { Footer, NotFound, AppHeader } from '../../components/Common';

import '../styles.scss';

const FullSizeLayout = ({component, navigationMode = 'guest', accessRoles, ...rest}) => {
  const isRouteAccessible = !accessRoles || (accessRoles && accessRoles.includes(navigationMode));

  return (
    <div id="wrapper" className="wrapper">
      <AppHeader fullsize />
      <main id="container" className="container--fullsize">
        {
          isRouteAccessible
            ? <Route { ...rest } component={ component } />
            : <Route { ...rest } component={ NotFound } />
        }
      </main>
      <Footer />
    </div>
  );
}

export {
  FullSizeLayout
};