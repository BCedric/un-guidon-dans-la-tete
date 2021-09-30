import React, { useState } from 'react'
import CustomForm from 'generics/components/CustomForm'
import { useDispatch } from 'react-redux'
import { postMedia } from 'store/pages/mediaSlice'
import { Input } from '@mui/material'

const MediaForm = ({ cancel }) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [file, setFile] = useState(null)

  const dispatch = useDispatch()

  const submit = (e) => {
    const formData = new FormData()
    formData.append('file', file)
    return postMedia(formData, dispatch)
  }

  const handleFileChange = (e) => (
    setIsFormValid(e.target.files[0] != null), setFile(e.target.files[0])
  )

  return (
    <CustomForm
      onSubmit={submit}
      onCancel={cancel}
      isFormValid={isFormValid == null ? false : isFormValid}
    >
      <label htmlFor="fanfaron-file-input" className="form-label">
        Fichier
      </label>
      <Input
        onChange={handleFileChange}
        className="form-control"
        id="fanfaron-file-input"
        type="file"
      ></Input>
    </CustomForm>
  )
}

export default MediaForm
