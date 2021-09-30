import React from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

const EntitiesList = ({
  onDelete = () => {},
  onEdit = () => {},
  properties,
  entities,
  canEdit,
  canDelete
}) => {
  const getPropertyName = (property) =>
    typeof property === 'string' ? property : property.name

  const getProperty = (property, entity) =>
    typeof property === 'string' ? entity[property] : property.render(entity)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {properties.map((property, index) => (
                <TableCell key={index} className="capitalize">
                  {getPropertyName(property)}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.map((entity, index) => (
              <TableRow key={index}>
                {properties.map((property, index) => (
                  <TableCell key={index}>
                    {getProperty(property, entity)}
                  </TableCell>
                ))}
                <TableCell>
                  {canEdit && (
                    <span
                      className="clickable material-icons"
                      onClick={() => onEdit(entity)}
                    >
                      edit
                    </span>
                  )}
                  {canDelete && (
                    <span
                      className="clickable material-icons"
                      onClick={() => onDelete(entity.id)}
                    >
                      delete
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {entities.length === 0 && (
              <TableRow>
                <TableCell colSpan={properties.length} className="informations">
                  <span className="material-icons">info</span>
                  <span>Cette table ne contient aucun élément</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default EntitiesList
