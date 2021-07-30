import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { PriceTag } from '../PriceTag/PriceTag';
import { useWindowWidth } from '@react-hook/window-size';

import './ProductCard.scss';

const ProductCard = (props) => {
   const cardRef = useRef(null);
   const [coords, setCoors] = useState({
      mouseX: 0,
      mouseY: 0
   });
   const [size, setSize] = useState({
      width: 0,
      height: 0
   });
   const [mouseLeaveDelay, setMouseLeaveDelay] = useState(0);
   const [isVisible, setIsVisible] = useState(false);
   const screenWidth = useWindowWidth();

   useEffect(() => {
      const { offsetWidth, offsetHeight } = cardRef.current;
      setSize({
         width: offsetWidth,
         height: offsetHeight
      })
      setTimeout(() => {
         setIsVisible(true)
      }, 300 + (300 * props.index))
   }, [props.index])

   const mousePX = () => {
      return coords.mouseX / size.width;
   }
   const mousePY = () => {
      return coords.mouseY / size.height;
   }
   const cardStyle = () => {
      const rX = mousePX() * 30;
      const rY = mousePY() * -30;
      return {
         transform: `rotateY(${rX}deg) rotateX(${rY}deg) translateZ(0px)`
      };
   }
   const cardBgTransform = () => {
      const tX = mousePX() * -40;
      const tY = mousePY() * -40;
      return {
         transform: `translateX(${tX}px) translateY(${tY}px)`
      }
   }
   const cardBgImage = () => {
      return {
         background: `url(${props.product.imageUrl})`,
         backgroundSize: '101%',
         backgroundPosition: 'center',
         backgroundRepeat: 'no-repeat'
      }
   }

   // DESKTOP hover handler
   const handleMouseMove = (e) => {
      const { offsetLeft, offsetTop } = cardRef.current;
      const mouseX = e.pageX - offsetLeft - size.width / 2;
      const mouseY = e.pageY - offsetTop - size.height / 2;

      setCoors({
         mouseX,
         mouseY
      })
   }
   const handleMouseEnter = () => {
      if (mouseLeaveDelay) {
         clearTimeout(mouseLeaveDelay);
      }
   }
   const handleMouseLeave = () => {
      setMouseLeaveDelay( setTimeout(() => {
         setCoors({
            mouseX: 0,
            mouseY: 0
         })
      }, 1000))
   }

   // MOBILE: touch handlers
   const handleTouchMove = (e) => {
      const touch = e.touches[0];

      const { offsetLeft, offsetTop } = cardRef.current;
      if (touch.pageX < offsetLeft || touch.pageY < offsetTop) {
         return;
      }
      const mouseX = touch.pageX - offsetLeft - size.width / 2;
      const mouseY = touch.pageY - offsetTop - size.height / 2;

      setCoors({
         mouseX,
         mouseY
      })
   }
   const handleTouchStart = (e) => {
      if (mouseLeaveDelay) {
         clearTimeout(mouseLeaveDelay);
      }
   }
   const handleTouchEnd = () => {
      setMouseLeaveDelay( setTimeout(() => {
         setCoors({
            mouseX: 0,
            mouseY: 0
         })
      }, 1000))
   }

   const { product: { title, description, _id }, actions: { selectProduct } } = props;
   let cardParams = {};

   if (screenWidth < 600) {
      // mobile card events handlers
      cardParams = {
         ...cardParams,
         onTouchMove: handleTouchMove,
         onTouchStart: handleTouchStart,
         onTouchEnd: handleTouchEnd
      }
   } else {
      // desktop card events handlers
      cardParams = {
         ...cardParams,
         onMouseMove: handleMouseMove,
         onMouseEnter: handleMouseEnter,
         onMouseLeave: handleMouseLeave
      }
   }

   return (
      <div className={classNames({
         'ProductCard': true,
         'ProductCard--visible': isVisible
      })}
         {...cardParams}
         ref={cardRef}
         onClick={_ => {
            selectProduct(_id)
         }}
      >
         <div className="card" style={cardStyle()} >
            <div className="card-price">
               <PriceTag product={props.product} />
            </div>
            <div className="card-bg" style={{ ...cardBgTransform(), ...cardBgImage() }}></div>
            <div className="card-info">
               <h2 slot="header">{title}</h2>
               <p slot="content">{description}</p>
            </div>
         </div>
      </div>
   )

}

export {
   ProductCard
}
