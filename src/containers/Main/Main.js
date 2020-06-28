import React, { Component } from 'react';
import classNames from 'classnames';
import { constants } from '../../config/constants.config';

import statsApi from '../../api/statsApi';

import { Button } from '../../components/Common';
import { QuotesGenerator } from '../../components';

import './Main.scss';
import quotesApi from '../../api/quotesApi';

class Main extends Component {
  state = {
    isLoaded: false,
    quotes: []
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoaded: true
      })
    }, 200);

    const nodes = document.querySelectorAll('.ripple');
    for (let i = 0; i < nodes.length; i++) {
      let letters = nodes[i].innerText.split('').join('</span><span>');
      letters = letters.split(' ').join('&nbsp;');
      nodes[i].innerHTML = `<span>${letters}</span>`;

      const children = nodes[i].childNodes;
      for (let j = 0; j < children.length; j++) {
        children[j].style.animationDelay = (j / 10) + 's';
      }
    }

    statsApi.track();
  }

  redirectToStore = () => {
    this.props.history.push('/store')
  }

  // quotes
  fetchQuotes = async () => {
    const quotes = await quotesApi.list();
    this.setState({
      quotes
    })
  }

  render() {
    return <div className={classNames({
      'Main': true,
      'Main--loading': !this.state.isLoaded
    })}>
      <QuotesGenerator data={{ quotes: this.state.quotes }} actions={{ fetchData: this.fetchQuotes }}/>
      <h1 className="Main__title ripple">
        {constants.main.title}
      </h1>
      <Button className={'Main__redirect'} onClick={this.redirectToStore} label={constants.main.explore}/>
    </div>
  }
}

export {
  Main
};