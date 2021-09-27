import React, { useEffect } from 'react'

import moment from 'moment'

import EntitiesAdmin from 'generics/components/EntitiesAdmin'
import MobileWorkshopsForm from './MobileWorkshopsForm'
import {
  fetchMobileWorkshops,
  getMobileWorkshops,
  deleteMobileWorkshop
} from 'store/pages/mobileWorkshopsSlice'
import { useDispatch } from 'react-redux'

const MobileWorkshopsAdmin = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    fetchMobileWorkshops(dispatch)
  }, [])

  return (
    <div>
      <EntitiesAdmin
        title="Pages"
        FormComponent={MobileWorkshopsForm}
        propertiesSelector={getMobileWorkshops}
        deleteEntity={deleteMobileWorkshop}
        properties={[
          {
            name: 'Date',
            render: (entity) => moment(entity.startDate).format('DD/MM/yyyy')
          },
          {
            name: 'Début',
            render: (entity) => moment(entity.startDate).format('HH:mm')
          },
          {
            name: 'Fin',
            render: (entity) => moment(entity.endDate).format('HH:mm')
          },
          { name: 'Lieu', render: (entity) => entity.place },
          { name: 'Evènement', render: (entity) => entity.eventName }
        ]}
      />
    </div>
  )
}

export default MobileWorkshopsAdmin
