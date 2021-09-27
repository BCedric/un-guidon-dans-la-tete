import React, { useEffect, useState } from 'react'

import moment from 'moment'

import { mobileWorkshopApi } from 'constants/api-const'

import Http from 'services/Http'

const MobileWorkshopsCalendar = () => {
  const [workshops, setWorkshops] = useState([])
  useEffect(() => {
    Http.get(mobileWorkshopApi.mobileWorkshopsComing()).then(
      (mobileWorkshops) => setWorkshops(mobileWorkshops)
    )
    moment.locale('fr')
  }, [])

  return (
    <div className="mobile-workshop-calendar">
      <ul>
        {workshops.map((workshop, index) => (
          <li key={index}>
            <span className="date">
              {' '}
              {moment(workshop.startDate).local('fr').format('LL')}
            </span>{' '}
            :{workshop.eventName === '' ? 'Atelier mobile' : workshop.eventName}{' '}
            de {moment(workshop.startDate).format('HH:mm')} à{' '}
            {moment(workshop.endDate).format('HH:mm')}, {workshop.place}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileWorkshopsCalendar
