import React, { useEffect, useState } from 'react'
import classNames from 'classnames';

import { Button } from '../Common';
import { TextInput } from '../Inputs';
import { constants } from '../../config';

import { FcFeedback } from 'react-icons/fc';

import './Feedback.scss';

function Feedback(props) {
   const [isVisible, setIsVisible] = useState(false);
   const [isFeedbackAvailable, setIsFeedbackAvailable] = useState(Number(localStorage.getItem('isFeedbackLeft')));
   const [showThanks, setShowThanks] = useState(false);
   const [rate, setRate] = useState(50);
   const [comment, setComment] = useState('');
   const { actions: { onLeaveFeedback } } = props;

   useEffect(() => {
      if (!isVisible) {
         return;
      }
      // REDO: raw js, just because it works
      var select = function (s) {
         return document.querySelector(s);
      },
         selectAll = function (s) {
            return document.querySelectorAll(s);
         },
         liquid = selectAll('.liquid'),
         label = select('.label'),
         follower = select('.follower'),
         dragger = select('.dragger'),
         dragTip = select('.dragTip'),
         minDragY = -380,
         liquidId = 0,
         step = Math.abs(minDragY / 100),
         followerVY = 0;

      window.TweenMax.set('svg', {
         visibility: 'visible'
      })

      window.TweenMax.set(dragTip, {
         transformOrigin: '20% 50%'
      })

      var tl = new window.TimelineMax()
      tl.staggerTo(liquid, 0.7, {
         x: '-=200',
         ease: window.Linear.easeNone,
         repeat: -1
      }, 0.9)

      tl.time(100);

      document.addEventListener("touchmove", function (event) {
         event.preventDefault();
      });
      window.Draggable.create(dragger, {
         type: 'y',
         bounds: { minY: minDragY, maxY: 0 },
         onDrag: onUpdate,
         throwProps: true,
         throwResistance: 2300,
         onThrowUpdate: onUpdate,
         overshootTolerance: 0
      })

      function onUpdate() {
         liquidId = Math.abs(Math.round(dragger._gsTransform.y / step));

         setRate(liquidId);

         label.textContent = liquidId + '°';
         window.TweenMax.to(liquid, 1.3, {
            y: dragger._gsTransform.y * 1.12,
            ease: window.Elastic.easeOut.config(1, 0.4)
         })

      }

      window.TweenMax.to(follower, 1, {
         y: '+=0',
         repeat: -1,
         modifiers: {
            y: function (y, count) {
               followerVY += (dragger._gsTransform.y - follower._gsTransform.y) * 0.23;
               followerVY *= 0.69;
               return follower._gsTransform.y + followerVY;
            }
         }
      })

      window.TweenMax.to(dragTip, 1, {
         rotation: '+=0',
         repeat: -1,
         modifiers: {
            rotation: function (rotation, count) {
               return rotation - followerVY
            }
         }
      })

      window.TweenMax.to(label, 1, {
         y: '+=0',
         repeat: -1,
         modifiers: {
            y: function (y, count) {
               return y - followerVY * 0.5
            }
         }
      })

      window.TweenMax.to(dragger, 1.4, {
         y: minDragY / 2,
         onUpdate: onUpdate,
         ease: window.Expo.easeInOut
      })
   }, [isVisible]);


   const onSendClick = (e) => {
      e.preventDefault();
      onLeaveFeedback({
         rate,
         comment
      })
      localStorage.setItem("isFeedbackLeft", 1);
      setShowThanks(true);
      setTimeout(() => {
         setIsVisible(false);
      }, 500)
      setTimeout(() => {
         setIsFeedbackAvailable(false);
      }, 2000)
   }

   const renderRateContainer = () => {
      if (isVisible) {
         return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 600">
            <defs>
               <linearGradient id="liquidGrad" x1="557" y1="150" x2="557" y2="546" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#FF0909" />
                  <stop offset="0.2" stopColor="#F3481A" />
                  <stop offset="0.5" stopColor="#FABA2C" />
                  <stop offset="1" stopColor="#00BCF2" />
               </linearGradient>
               <rect id="tube" x="357" y="150" width="86" height="400" rx="43" ry="43" />
               <clipPath id="liquidMask">
                  <use xlinkHref="#tube" className="liquidMask" />
               </clipPath>
               <clipPath id="tubeMask">
                  <use xlinkHref="#tube" className="liquidMask" />
               </clipPath>
               <path id="liquid" d="M757,552v490H357V552c50,0,50,20,100,20s50-20,100-20,50,20,100,20S707,552,757,552Z" />
               <mask id="gradMask">

                  <use xlinkHref="#liquid" className="liquid" x="0" fill="#FCEFD6" />
                  <use xlinkHref="#liquid" className="liquid" x="0" fill="#EEE" opacity="0.7" />

               </mask>
            </defs>

            <g className="whole" transform="translate(0, -40)">

               <use xlinkHref="#tube" className="tubeBg" fill="#C8D9D3" opacity="0.61" />

               <g className="dragger" transform="translate(-6, 0)">
                  <circle cx="294" cy="540" r="36" fill="#3A3335" />
                  <path className="dragTip" d="M315.5,556.76,299.24,540.5l16.26-16.26,36.26,16.26Z" fill="#3A3335" />
                  <text className="label" x="294" y="551">100</text>
               </g>

               <g mask="url(#gradMask)">
                  <use xlinkHref="#tube" fill="url(#liquidGrad)" />
               </g>
               <line className="tubeShine" x1="371" y1="200" x2="371" y2="443" fill="none" stroke="#FFF" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="8" opacity="0.21" strokeDasharray="153 30" strokeDashoffset="-20" />
               <g className="measurements" fill="none" stroke="#FCEFD6" strokeWidth="3" strokeLinecap="round" opacity="1">
                  <line x1="358" y1="196" x2="370" y2="196" />
                  <line x1="358" y1="234" x2="370" y2="234" />
                  <line x1="358" y1="273" x2="370" y2="273" />
                  <line x1="358" y1="311" x2="370" y2="311" />
                  <line x1="358" y1="350" x2="370" y2="350" />
                  <line x1="358" y1="388" x2="370" y2="388" />
                  <line x1="358" y1="426" x2="370" y2="426" />
                  <line x1="358" y1="465" x2="370" y2="465" />
                  <line x1="358" y1="503" x2="370" y2="503" />
               </g>

               <circle className="follower" cx="400" cy="540" r="0" fill="#62B6CB" fillOpacity="1" stroke="#FCEFD6" strokeWidth="0" />

            </g>
         </svg>
      }
   }

   if (isFeedbackAvailable === 1) {
      return <></>;
   }

   return (
      <div className={
         classNames({
            'Feedback': true,
            'Feedback--visible': isVisible
         })
      }>
         {
            showThanks
               ? <h3 classNames="Feedback__thanks">{constants.feedback.thankYou}</h3> 
               : <><div className="Feedback__rate-container">
               <h4>{constants.feedback.leaveUsFeedBack}</h4>
               {renderRateContainer()}
               <TextInput maxLength="100" label={constants.feedback.commentLabel} value={comment} onChange={value => setComment(value)} />
               <Button info label={constants.common.actions.send} onClick={onSendClick} />
            </div>
            <div className="Feedback__trigger">
               <Button success label={<FcFeedback />} onClick={_ => setIsVisible(!isVisible)} />
            </div>
            </>
         }
      </div >
   )
}


export { Feedback }

