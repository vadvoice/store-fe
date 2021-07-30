import React from 'react';

import { GrFormPreviousLink, GrFormNextLink } from 'react-icons/gr';
import './ImageGallery.scss';

class ImageGallery extends React.Component {
   constructor() {
      super();

      this.state = {
         currentIndex: 0,
         isTransitioning: false,
         goingLeft: false,
      };
   }

   componentDidMount() {
      window.addEventListener('keyup', this.onKeyUp);
   }

   componentWillUnmount() {
      window.removeEventListener('keyup', this.onKeyUp);
   }

   onKeyUp = (e) => {
      if (e.keyCode) {
         if (e.keyCode === 39) {
            this.showNextSet();
         } else if (e.keyCode === 37) {
            this.showPrevSet();
         }
      }
   }

   renderControls () {
      if (this.props.images.length <= 1) {
         return;
      }
      return <div className="ImageGallery__controls">
         <button className="ImageGallery__controls__button" onClick={this.showPrevSet}><GrFormPreviousLink /></button>
         <button className="ImageGallery__controls__button" onClick={this.showNextSet}><GrFormNextLink /></button>
      </div>
   }

   render() {
      const { currentIndex } = this.state;
      const { images } = this.props;

      return (
         <div className="ImageGallery">
            <div className="ImageGallery__container">
               {images.map(({name, url}, index) => {
                  let className = 'ImageGallery__container__image'
                  if (index === currentIndex) className += ' active';

                  if (url.includes('video')) {
                     return <video autoPlay loop src={url} className={className} key={`img-${index}`} />;
                  }
                  return <img src={url} className={className} key={`img-${index}`} alt={name} />;
               })}
            </div>
            {this.renderControls()}
            
         </div>
      );
   }

   showPrevSet = () => {
      const currentIndex = (this.state.currentIndex - 1 + this.props.images.length) % this.props.images.length;
      this.setState({ currentIndex });
   }

   showNextSet = () => {
      const currentIndex = (this.state.currentIndex + 1) % this.props.images.length;
      this.setState({ currentIndex });
   }
}

export {
   ImageGallery
}