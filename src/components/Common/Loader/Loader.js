import React from 'react';

import './Loader.scss';

const Loader = () => {
   return (
      <div className="Loader">
         <div className="loader">
            <div className="arc"></div>
            <div className="arc"></div>
            <div className="arc"></div>
         </div>
      </div>
   )
}


export {
   Loader
};
