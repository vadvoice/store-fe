import React from 'react';
import './StatusLabel.scss';

const StatusLabel = (props) => {
   return (
      <div className="StatusLabel">
         {props.children}
      </div>
   );
}

export {
   StatusLabel
}