import React, { useState } from 'react'

import { IconButton, InputAdornment, TextField } from '@mui/material'

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
  canAdd = true,
  filterFunction
}) => {
  const entities = useSelector(propertiesSelector)
  const dispatch = useDispatch()

  const [displayForm, setDisplayForm] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState(null)
  const [filterValue, setFilterValue] = useState('')

  const filteredEntities =
    filterFunction == null
      ? entities
      : entities.filter(filterFunction(filterValue))

  return (
    <div>
      <h2>{title}</h2>
      {displayForm && (
        <FormComponent
          cancel={() => setDisplayForm(false)}
          entity={selectedEntity}
        />
      )}
      <div className="admin-list">
        <div className="list-actions">
          {canAdd && (
            <span
              className="add-action clickable material-icons"
              onClick={() => (setSelectedEntity(null), setDisplayForm(true))}
            >
              add
            </span>
          )}
          {filterFunction != null && (
            <div className="text-field-container">
              <TextField
                className="filter-list-value"
                label="Rechercher"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setFilterValue('')}
                      >
                        <span className="clickable material-icons">cancel</span>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
          )}
        </div>
        <EntitiesList
          entities={filteredEntities}
          properties={properties}
          onDelete={(id) => {
            deleteEntity(id, dispatch)
          }}
          onEdit={(entity) => (setSelectedEntity(entity), setDisplayForm(true))}
          canEdit={canEdit}
          canDelete={canDelete}
          filterFunction={filterFunction}
        />
      </div>
    </div>
  )
}

export default EntitiesAdmin
