import React, { useEffect } from 'react'

import EntitiesAdmin from 'generics/components/EntitiesAdmin'
import InfosForm from './InfosForm'
import { fetchInfos, getInfos } from 'store/pages/infosSlice'
import { useDispatch } from 'react-redux'

const translations = {
  phone: 'Téléphone',
  address: 'Adresse postale',
  mail: 'Adresse mail',
  facebook: 'Facebook'
}

const InfosAdmin = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    fetchInfos(dispatch)
  }, [])

  return (
    <div>
      <EntitiesAdmin
        title="Pages"
        FormComponent={InfosForm}
        propertiesSelector={getInfos}
        properties={[
          { name: '', render: (entity) => translations[entity.tag] },
          { name: 'tag', render: (entity) => entity.tag },
          'id',
          'value'
        ]}
        canAdd={false}
        canDelete={false}
        filterFunction={(value) => (entity) =>
          translations[entity.tag].toLowerCase().includes(value.toLowerCase())}
      />
    </div>
  )
}

export default InfosAdmin
