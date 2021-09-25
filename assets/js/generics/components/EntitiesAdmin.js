import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import EntitiesList from './EntitiesList'

const EntitiesAdmin = ({
  title,
  FormComponent,
  propertiesSelector,
  properties,
  deleteEntity,
  canEdit = true,
  canDelete = true,
  canAdd = true
}) => {
  const entities = useSelector(propertiesSelector)
  const dispatch = useDispatch()

  const [displayForm, setDisplayForm] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState(null)

  return (
    <div>
      <h2>{title}</h2>
      {canAdd && (
        <span
          className="clickable material-icons"
          onClick={() => (setSelectedEntity(null), setDisplayForm(true))}
        >
          add
        </span>
      )}
      <EntitiesList
        entities={entities}
        properties={properties}
        onDelete={(id) => {
          deleteEntity(id, dispatch)
        }}
        onEdit={(entity) => (setSelectedEntity(entity), setDisplayForm(true))}
        canEdit={canEdit}
        canDelete={canDelete}
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
