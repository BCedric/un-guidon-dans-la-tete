import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { deletePage } from 'store/pages/pagesSlice'
import EntitiesList from './EntitiesList'

const EntitiesAdmin = ({
  title,
  FormComponent,
  propertiesSelector,
  properties
}) => {
  const entities = useSelector(propertiesSelector)
  const dispatch = useDispatch()

  const [displayForm, setDisplayForm] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState(null)

  return (
    <div>
      <h2>{title}</h2>
      <span
        className="clickable material-icons"
        onClick={() => (setSelectedEntity(null), setDisplayForm(true))}
      >
        add
      </span>
      <EntitiesList
        entities={entities}
        properties={properties}
        onDelete={(id) => {
          deletePage(id, dispatch)
        }}
        onEdit={(entity) => (setSelectedEntity(entity), setDisplayForm(true))}
      />
      {displayForm && (
        <FormComponent
          cancel={() => setDisplayForm(false)}
          entity={selectedEntity}
        />
      )}
    </div>
  )
}

export default EntitiesAdmin
