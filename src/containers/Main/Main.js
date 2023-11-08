import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { constants } from '../../config/constants.config';

import { Button, Loader } from '../../components/Common';
import { QuotesGenerator } from '../../components';

import { setQuotes } from '../../modules/Store/storeActions';

import { connect } from 'react-redux';

import quotesApi from '../../api/quotesApi';
import { useNavigate } from 'react-router-dom';

import './Main.scss';

const MainContainer = ({ storeActions: { setQuotes }, store }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    const nodes = document.querySelectorAll('.ripple');

    for (let i = 0; i < nodes.length; i++) {
      let letters = nodes[i].innerText.split('').join('</span><span>');
      letters = letters.split(' ').join('&nbsp;');
      nodes[i].innerHTML = `<span>${letters}</span>`;

      const children = nodes[i].childNodes;
      for (let j = 0; j < children.length; j++) {
        children[j].style.animationDelay = j / 10 + 's';
      }
    }
  }, []);

  const redirectToStore = () => {
    navigate('/store');
  };

  // quotes
  const fetchQuotes = async () => {
    // prevent API call if quotes are already fetched
    if (store.quotesList.length) {
      return;
    }
    try {
      const quotes = await quotesApi.list();
      setQuotes(quotes);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={classNames({
        Main: true,
        'Main--loading': !isLoaded,
      })}
    >
      {!isLoaded && <Loader />}
      <QuotesGenerator
        data={{ quotes: store.quotesList }}
        actions={{ fetchData: fetchQuotes }}
      />
      <h1 className="Main__title ripple">{constants.main.title}</h1>
      <Button
        info
        className={'Main__redirect'}
        onClick={redirectToStore}
        label={constants.main.explore}
      />
    </div>
  );
};

const mapStateToProps = ({ store }) => ({
  store,
});

const mapActionsToProps = (dispatch) => {
  return {
    storeActions: {
      setQuotes: (products) => {
        dispatch(setQuotes(products));
      },
    },
  };
};

const Main = connect(mapStateToProps, mapActionsToProps)(MainContainer);

export { Main };
