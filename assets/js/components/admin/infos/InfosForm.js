import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { TextField } from '@mui/material'

import { putInfo } from 'store/infosSlice'
import { addMessage } from 'store/messagesSlice'

import CustomForm from 'generics/components/CustomForm'

const InfosForm = ({ cancel, entity }) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (entity != null) {
      setValue(entity.value)
    }
  }, [entity])

  const submit = (e) => {
    return putInfo(entity.id, { value }, dispatch).then((res) => {
      dispatch(
        addMessage({ content: 'Mise à jour des informations avec succès' })
      )
      return res
    })
  }

  const isFormValid = value !== ''

  return (
    <CustomForm onSubmit={submit} onCancel={cancel} isFormValid={isFormValid}>
      <div className="form-line align-end">
        <TextField
          value={value}
          label="Valeur"
          onChange={(e) => setValue(e.target.value)}
          className="form-control"
          id="label-input"
          type="text"
        ></TextField>
      </div>
    </CustomForm>
  )
}

export default InfosForm
