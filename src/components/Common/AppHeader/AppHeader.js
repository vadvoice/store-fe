import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  FaFacebookSquare,
  FaShoppingCart,
  FaHome,
  FaInfoCircle,
} from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import LogoDark from '../../../assets/images/logo_dark.jpeg';
import LogoLight from '../../../assets/images/logo_light.jpg';

import { constants } from '../../../config';
import { Routing } from '../Routing/Routing';
import { THEMES } from '../../../services/systemColorScheme';

import './AppHeader.scss';

const Header = (props) => {
  const [systemColorScheme, setSystemColorScheme] = useState(THEMES.light);
  const { fullsize, cartProducts } = props;
  const { navigation } = constants;

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addListener((e) => e.matches && setSystemColorScheme(THEMES.dark));
  window
    .matchMedia('(prefers-color-scheme: light)')
    .addListener((e) => e.matches && setSystemColorScheme(THEMES.light));

  const renderLogo = () => {
    switch (systemColorScheme) {
      case THEMES.dark: {
        return <img src={LogoDark} alt="logo" />;
      }
      default: {
        return <img src={LogoLight} alt="logo" />;
      }
    }
  };

  const links = [
    {
      title: <FaHome />,
      link: '/store',
      label: navigation.store,
    },
    {
      title: <FaShoppingCart />,
      link: '/store/cart',
      notify: cartProducts.length,
      label: navigation.cart,
    },
  ];

  if (fullsize) {
    return (
      <header className="AppHeader AppHeader--fullsize">
        <div className="AppHeader__navigation" title={navigation.home}>
          <NavLink
            // className="AppHeader__navigation__icon"
            to={`/`}
            className={({ isActive }) =>
              `AppHeader__navigation__icon ${
                isActive ? 'AppHeader__navigation__icon--active' : ''
              }`
            }
            title={'home'}
          >
            {renderLogo()}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `AppHeader__navigation__icon ${
                isActive ? 'AppHeader__navigation__icon--active' : ''
              }`
            }
            to={`/about`}
            title={'about'}
          >
            <FaInfoCircle />
          </NavLink>
        </div>
        <div className="AppHeader__social">
          <a
            className="AppHeader__social__link"
            rel="noopener noreferrer"
            target="_blank"
            href={constants.links.facebook}
            title={navigation.facebook}
          >
            <FaFacebookSquare />
          </a>
          <a
            className="AppHeader__social__link"
            rel="noopener noreferrer"
            target="_blank"
            href={constants.links.instagram}
            title={navigation.instagram}
          >
            <AiFillInstagram />
          </a>
        </div>
      </header>
    );
  }

  return (
    <header className="AppHeader">
      <div className="AppHeader__navigation">
        <NavLink
          className="AppHeader__navigation__icon"
          to={`/`}
          activeClassName={'AppHeader__navigation__icon--active'}
          title={'home'}
        >
          {renderLogo()}
        </NavLink>
        <NavLink
          className="AppHeader__navigation__icon"
          to={`/about`}
          activeClassName={'AppHeader__navigation__icon--active'}
          title={'about'}
        >
          <FaInfoCircle />
        </NavLink>
      </div>

      <Routing links={links} />
    </header>
  );
};

const mapStateToProps = ({ cart: { cartProducts } }) => ({
  cartProducts,
});

const mapActionsToProps = () => ({});

const AppHeader = connect(mapStateToProps, mapActionsToProps)(Header);

export { AppHeader };
