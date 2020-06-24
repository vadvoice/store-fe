import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { FaFacebookSquare, FaShoppingCart, FaHome, FaInfoCircle } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import Logo from '../../../assets/images/logo.jpeg';

import { constants } from '../../../config';
import { Routing } from '../Routing/Routing';

import './AppHeader.scss';

const Header = (props) => {
   const { fullsize, cartProducts } = props;
   const { navigation } = constants;
   const redirectToMainPage = (e, path) => {
      if (e) {
         e.preventDefault();
      }
      props.history.push(path);
   }

   const links = [{
      title: <FaHome />,
      link: 'store',
      exact: true,
      label: navigation.store
   }, {
      title: <FaShoppingCart />,
      link: 'store/cart',
      notify: cartProducts.length,
      label: navigation.cart
   }];

   if (fullsize) {
      return <header className="AppHeader AppHeader--fullsize">
         <div className="AppHeader__navigation" title={navigation.home}>
            {/* <a className={'AppHeader__navigation__icon'} href={'/'} onClick={e => redirectToMainPage(e, '/')}><img src={Logo} alt="logo" /></a> */}
            <NavLink
               className="AppHeader__navigation__icon"
               exact
               to={`/`}
               activeClassName={"AppHeader__navigation__icon--active"}
               title={'home'}
            >
               <img src={Logo} alt="logo" />
            </NavLink>
            <NavLink
               className="AppHeader__navigation__icon"
               to={`/about`}
               activeClassName={"AppHeader__navigation__icon--active"}
               title={'about'}
            >
               <FaInfoCircle />
            </NavLink>
         </div>
         <div className="AppHeader__social">
            <a className="AppHeader__social__link" rel="noopener noreferrer" target="_blank" href={constants.links.facebook} title={navigation.facebook}><FaFacebookSquare /></a>
            <a className="AppHeader__social__link" rel="noopener noreferrer" target="_blank" href={constants.links.instagram} title={navigation.instagram}><AiFillInstagram /></a>
         </div>
      </header>
   }

   return <header className="AppHeader">
      <div className="AppHeader__navigation">
         {/* <a className={'AppHeader__navigation__icon'} href={'/'} onClick={e => redirectToMainPage(e, '/')}><img src={Logo} alt="logo" /></a> */}
         <NavLink
            className="AppHeader__navigation__icon"
            exact
            to={`/`}
            activeClassName={"AppHeader__navigation__icon--active"}
            title={'home'}
         >
            <img src={Logo} alt="logo" />
         </NavLink>
         <NavLink
            className="AppHeader__navigation__icon"
            to={`/about`}
            activeClassName={"AppHeader__navigation__icon--active"}
            title={'about'}
         >
            <FaInfoCircle />
         </NavLink>
      </div>

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