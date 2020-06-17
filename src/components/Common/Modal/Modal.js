import React from 'react';
import HyperModal from 'react-hyper-modal';
import './Modal.scss';

const Modal = (props) => {
   const { isModalOpen, children, header, onClose } = props;
   return (
      <HyperModal
         portalMode
         classes={{
            wrapperClassName: 'Modal'
         }}
         isOpen={isModalOpen}
         requestClose={onClose}
      >
         <h1 className="Modal__header">
            {header}
         </h1>
         <div className="Modal__content">
            {children}
         </div>
      </HyperModal>
   );
}

export {
   Modal
}