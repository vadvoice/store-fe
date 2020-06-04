import React from 'react';
import classNames from 'classnames';
import './ProductCard.scss';

class ProductCard extends React.Component {
   constructor() {
      super();
      this.cardRef = React.createRef();
   }
   state = {
      width: 0,
      height: 0,
      mouseX: 0,
      mouseY: 0,
      mouseLeaveDelay: null,
      isVisible: false
   }
   componentDidMount() {
      const { offsetWidth, offsetHeight } = this.cardRef.current;
      this.setState({
         width: offsetWidth,
         height: offsetHeight
      })
      setTimeout(() => {
         this.setState({
            isVisible: true
         })
      }, 1000)
   }
   mousePX() {
      return this.state.mouseX / this.state.width;
   }
   mousePY() {
      return this.state.mouseY / this.state.height;
   }
   cardStyle = () => {
      const rX = this.mousePX() * 30;
      const rY = this.mousePY() * -30;
      return {
         transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
   }
   cardBgTransform() {
      const tX = this.mousePX() * -40;
      const tY = this.mousePY() * -40;
      return {
         transform: `translateX(${tX}px) translateY(${tY}px)`
      }
   }
   cardBgImage() {
      return {
         backgroundImage: `url(${this.props.product.image})`
      }
   }
   handleMouseMove = (e) => {
      const { offsetLeft, offsetTop } = this.cardRef.current;
      const mouseX = e.pageX - offsetLeft - this.state.width / 2;
      const mouseY = e.pageY - offsetTop - this.state.height / 2;

      this.setState({
         mouseX,
         mouseY
      })
   }
   handleMouseEnter = () => {
      clearTimeout(this.mouseLeaveDelay);
   }
   handleMouseLeave = () => {
      this.mouseLeaveDelay = setTimeout(() => {
         this.setState({
            mouseX: 0,
            mouseY: 0
         })
      }, 1000);
   }
   render() {
      const { isVisible } = this.state;
      const { title, description } = this.props.product;
      return (
         <div className={classNames({
            'ProductCard': true,
            'ProductCard--visible': isVisible
         })}
            onMouseMove={this.handleMouseMove}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            ref={this.cardRef}
         >
            <div className="card" style={this.cardStyle()}>
               <div className="card-bg" style={{ ...this.cardBgTransform(), ...this.cardBgImage() }}></div>
               <div className="card-info">
                  <h1 slot="header">{title}</h1>
                  <p slot="content">{description}</p>
                  <button
                     onClick={() => console.log('buy')}
                  >
                     buy
                  </button>
               </div>
            </div>
         </div>
      )
   }

}

export {
   ProductCard
}
