import React, { useEffect, useState } from 'react'

import { TextField } from '@material-ui/core'

import { putInfo } from 'store/pages/infosSlice'

import CustomForm from 'generics/components/CustomForm'
import { useDispatch } from 'react-redux'

const InfosForm = ({ cancel, entity }) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (entity != null) {
      setValue(entity.value)
    }
  }, [entity])

  const submit = (e) => {
    return putInfo(entity.id, { value }, dispatch)
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
