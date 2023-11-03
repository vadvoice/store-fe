import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { constants } from '../../config/constants.config';

import { Button } from '../../components/Common';
import { QuotesGenerator } from '../../components';

import './Main.scss';
import quotesApi from '../../api/quotesApi';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({
    quotes: [],
  });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectToStore = () => {
    navigate('/store');
  };

  // quotes
  const fetchQuotes = async () => {
    try {
      const quotes = await quotesApi.list();
      setData({
        ...data,
        quotes,
      });
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
      <QuotesGenerator
        data={{ quotes: data.quotes }}
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

export { Main };
