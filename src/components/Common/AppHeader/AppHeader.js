import React from 'react';
import { withRouter } from 'react-router-dom';

import { FaFacebookSquare } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import Logo from '../../../assets/images/logo.jpeg';

import './AppHeader.scss';
import { constants } from '../../../config';

const Header = (props) => {
   const { fullsize } = props;
   const redirectToMainPage = () => {
      props.history.push('/');
   }

   if (fullsize) {
      return <header className="AppHeader AppHeader--fullsize">
         <div className="AppHeader__logo">
            <a className="AppHeader__social__link" rel="noopener noreferrer" target="_blank" href={'/'}><img src={Logo} alt="logo" /></a>
         </div>
         <div className="AppHeader__social">
            <a className="AppHeader__social__link" rel="noopener noreferrer" target="_blank" href={constants.links.facebook}><FaFacebookSquare /></a>
            <a className="AppHeader__social__link" rel="noopener noreferrer" target="_blank" href={constants.links.instagram}><AiFillInstagram /></a>
         </div>
      </header>
   }

   return <header className="AppHeader">
      <div onClick={redirectToMainPage} className={'header-logo'} />
   </header>
}

const AppHeader = withRouter(Header);

export {
   AppHeader
}