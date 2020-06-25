import React from 'react';
import ReactModal from 'react-modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import './Modal.scss';

const Modal = (props) => {
   const { isModalOpen, children, header, onClose } = props;
   ReactModal.setAppElement('#portal-modal');
   const customStyles = {
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate3d(-50%, -50%, 1px)',
         border: 'none',
         width: '70%',
         padding: 0,
         zIndex: 9999,
         overflow: 'hidden'
      },
      overlay: {
         background: 'rgba(0,0,0,.6)',
         transform: `translateZ(100px)`
      }
   };
   if (window.innerWidth < 768) {
      customStyles.content.width = '100%';
   }
   
   return <ReactModal
      isOpen={isModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={header}
      portalClassName={'portal-modal'}
      
      // classNames={
      //    AnimationEffect
      // }
   >
      <div className="ReactModal__Content__header">
         <h2>
            {header}
         </h2>
         <AiOutlineCloseCircle onClick={onClose} />
      </div>
      <div className="ReactModal__Content__content">
         {children}
      </div>
   </ReactModal>

   // return (
   //    <div className="Modal">
   //       <ReactModal
   //          visible={isModalOpen}
   //          width="80%"
   //          height="80%"
   //          effect="fadeInUp"
   //          onClickAway={onClose}
   //       >
   //          <div className="Modal__header">
   //             <h2>
   //                {header}
   //             </h2>
   //             <AiOutlineCloseCircle onClick={onClose} />
   //          </div>
   //          <div className="Modal__content">
   //             {children}
   //          </div>
   //       </ReactModal>
   //    </div>
   // );
}

export {
   Modal
}