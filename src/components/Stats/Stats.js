import React, { useEffect } from 'react';
import moment from 'moment';

import './Stats.scss';

const Stats = (props) => {
   const { actions: { fetchData }, stats } = props;

   useEffect(() => {
      fetchData()
   }, [fetchData])

   return (
      <div>
         <h1>Stats</h1>
         {stats.map(s => {
            return <div key={s.ip + s.timestamp}>
               <div>
                  {s.ip}
                  <p>
                     <strong>browser/os</strong><i>{s.userAgent.browser}/{s.userAgent.os}</i>
                  </p>
                  <p>
                     <strong>timezone/city:</strong><i>{s.stats.timezone}/{s.stats.city}</i>
                  </p>
                  <p>
                     <strong>visit:</strong><i>{moment(s.timestamp).format()}</i>
                  </p>
               </div>
               <hr />
            </div>
         })}
      </div>
   )
}

export { Stats }

