import React, { useEffect } from 'react';
import { format } from "date-fns";

import './Stats.scss';
import InfoRow from '../Common/InfoRow/InfoRow';

const Stats = (props) => {
   const { actions: { fetchData }, data: { stats, feedbacks } } = props;

   useEffect(() => {
      fetchData()
   }, [fetchData])

   return (
      <div className="Stats">
         <h1>Stats</h1>
         <div className="Stats__container">
            <div className="Stats__container__stats">
               {
                  stats.length
                     ? stats.map(s => {
                        return <div key={s.ip + s.timestamp}>
                           <div>
                              <h4>{s.ip}</h4>
                              <InfoRow data={{ name: 'browser/os', value: `${s.userAgent.browser}/${s.userAgent.os}` }} />
                              <InfoRow data={{ name: 'timezone/city', value: `${s.stats && s.stats.timezone}/${s.stats && s.stats.city}` }} />
                              <InfoRow data={{ name: 'visit', value: format(new Date(s.timestamp), 'yyyy-MM-dd') }} />
                           </div>
                           <hr />
                        </div>
                     })
                     : <h4>no stats yet</h4>
               }
            </div>
            <div className="Stats__container__feedback">
               {
                  feedbacks.length
                     ? feedbacks.map(f => {
                        return <div key={f._id}>
                           <div>
                              <InfoRow data={{ name: 'rate', value: f.rate }} />
                              <InfoRow data={{ name: 'comment', value: f.comment }} />
                           </div>
                           <hr />
                        </div>
                     })
                     : <h4>no feedbacks yet</h4>
               }
            </div>
         </div>

      </div>
   )
}

export { Stats }

