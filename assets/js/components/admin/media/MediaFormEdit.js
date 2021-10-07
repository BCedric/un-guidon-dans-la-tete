import React, { useEffect, useState } from 'react'
import CustomForm from 'generics/components/CustomForm'
import { useDispatch } from 'react-redux'
import { putMedia } from 'store/pages/mediaSlice'
import { TextField } from '@mui/material'

const MediaFormEdit = ({ cancel, entity }) => {
  const [filename, setFilename] = useState('')

  useEffect(() => {
    const lastDotIndex = entity.filename.lastIndexOf('.')
    setFilename(entity.filename.substring(0, lastDotIndex))
  }, [entity])

  const dispatch = useDispatch()

  const submit = (e) => {
    const lastDotIndex = entity.filename.lastIndexOf('.')
    return putMedia(
      entity.id,
      { filename: `${filename}${entity.filename.substring(lastDotIndex)}` },
      dispatch
    )
  }

  const isFormValid = filename != entity.filename && filename != ''

  return (
    <CustomForm
      onSubmit={submit}
      onCancel={cancel}
      isFormValid={isFormValid == null ? false : isFormValid}
    >
      <div className="form-line align-end">
        <TextField
          label="Nom du fichier"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="form-control"
          type="text"
        ></TextField>
      </div>
    </CustomForm>
  )
}

export default MediaFormEdit
