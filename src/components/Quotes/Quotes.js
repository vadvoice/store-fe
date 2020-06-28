import React, { useEffect } from 'react';

import './Quotes.scss';
import { EditQuote } from './EditQuote/EditQuote';

const Quotes = (props) => {
   const { data: { quotes }, actions: { fetchData, submitQuote, deleteQuote } } = props;

   useEffect(() => {
      fetchData()
   }, [fetchData])

   return (
      <div className="Quotes">
        <h1>quotes</h1>
        <EditQuote isEditing={true} quote={{}} submit={submitQuote} />
        <ol>
           {quotes.map(q => <li key={q._id}>
               <EditQuote quote={q} submit={submitQuote} deleteQuote={deleteQuote} />
            </li>)}
        </ol>
      </div>
   )
}

export { Quotes }

