import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from "react-text-transition";
import './QuotesGenerator.scss';

const QuotesGenerator = (props) => {
   const { data: { quotes }, actions: { fetchData } } = props;
   const [activeQuote, setActiveQuote] = useState(null);

   useEffect(() => {
      fetchData();
   }, [fetchData]);

   useEffect(() => {
      const chagneQuote = setInterval(() => {
         setActiveQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      }, 5000);
      return () => {
         clearInterval(chagneQuote);
      }
   }, [quotes]);

   return (
      <div className="QuotesGenerator">
         <TextTransition
            text={ activeQuote ? activeQuote.text : '' }
            springConfig={ presets.wobbly }
         />
         <i>{ activeQuote ? `- ${activeQuote.author}` : '' }</i>
      </div>
   )
}

export { QuotesGenerator }

