import React from 'react';
import ReactModal from 'react-awesome-modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import './Modal.scss';

const Modal = (props) => {
   const { isModalOpen, children, header, onClose } = props;
   return (
      <div className="Modal">
         <ReactModal
            visible={isModalOpen}
            width="80%"
            height="80%"
            effect="fadeInUp"
            onClickAway={onClose}
         >
            <div className="Modal__header">
               <h2>
                  {header}
               </h2>
               <AiOutlineCloseCircle onClick={onClose} />
            </div>
            <div className="Modal__content">
               {children}
            </div>
         </ReactModal>
      </div>
   );
}

export {
   Modal
}