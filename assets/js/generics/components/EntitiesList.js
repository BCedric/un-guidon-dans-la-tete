import React from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'

const EntitiesList = ({
  onDelete = () => {},
  onEdit = () => {},
  properties,
  entities
}) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {properties.map((property, index) => (
                <TableCell key={index} className="capitalize">
                  {property}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.map((entity, index) => (
              <TableRow key={index}>
                <TableCell>{entity.tag}</TableCell>
                <TableCell>{entity.id}</TableCell>
                <TableCell>
                  <span
                    className="clickable material-icons"
                    onClick={() => onEdit(entity)}
                  >
                    edit
                  </span>
                  <span
                    className="clickable material-icons"
                    onClick={() => onDelete(entity.id)}
                  >
                    delete
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default EntitiesList
