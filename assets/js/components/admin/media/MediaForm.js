import React, { useState } from 'react'
import CustomForm from 'generics/components/CustomForm'
import { useDispatch } from 'react-redux'
import { postMedia } from 'store/pages/mediaSlice'
import { Input } from '@material-ui/core'

const MediaForm = ({ cancel }) => {
  const fileInput = React.createRef()

  const [isFormValid, setIsFormValid] = useState(false)

  const dispatch = useDispatch()

  const submit = (e) => {
    const file = fileInput.current.files[0]
    const formData = new FormData()
    console.log(file)
    formData.append('file', file)
    console.log(formData)
    postMedia(formData, dispatch)
  }

  const handleFileChange = (e) => setIsFormValid(e.target.files[0] != null)

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
        ref={fileInput}
      ></Input>
    </CustomForm>
  )
}

export default MediaForm
