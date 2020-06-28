import React, { useEffect, useState } from 'react';

import './QuotesGenerator.scss';

const QuotesGenerator = (props) => {
   const { data: { quotes }, actions: { fetchData } } = props;
   const [activeQuote, setActiveQuote] = useState(quotes && quotes.length && quotes[0].text);

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
         {
            activeQuote
               ? <h4>{activeQuote.text}</h4>
               : null
         }
      </div>
   )
}

export { QuotesGenerator }

