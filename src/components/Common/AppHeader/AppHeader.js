import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { FaFacebookSquare, FaShoppingCart, FaHome } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import Logo from '../../../assets/images/logo.jpeg';

import { constants } from '../../../config';
import { Routing } from '../Routing/Routing';

import './AppHeader.scss';

const Header = (props) => {
   const { fullsize, cartProducts } = props;
   const redirectToMainPage = () => {
      props.history.push('/');
   }

   const links = [{
      title: <FaHome />,
      link: 'store',
      exact: true
   }, {
      title: <FaShoppingCart />,
      link: 'store/cart',
      notify: cartProducts.length
   }];

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
      <Routing path={props.match.path} links={links} />
   </header>
}

const AppHeaderContainer = withRouter(Header);

const mapStateToProps = ({ cart: { cartProducts } }) => ({
   cartProducts
});

const mapActionsToProps = (dispatch) => ({});

const AppHeader = connect(mapStateToProps, mapActionsToProps)(AppHeaderContainer);

export {
   AppHeader
}