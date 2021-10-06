import React, { useState } from 'react'

import { Button, CircularProgress } from '@mui/material'

const CustomForm = ({
  className,
  children,
  onCancel = () => {},
  onSubmit = () => {},
  isFormDirty = true,
  isFormValid = true
}) => {
  const [isSubmitting, setIsSubmitting] = useState()

  const onFormSubmit = (e) => {
    setIsSubmitting(true)
    e.preventDefault()
    onSubmit(e)
      .then((res) => {
        setIsSubmitting(false)
        return res
      })
      .then(onCancel)
  }

  return (
    <form onSubmit={onFormSubmit} className={className}>
      {children}
      <div className="form-buttons-container">
        <Button
          variant="contained"
          type="submit"
          disabled={!isFormDirty || !isFormValid}
        >
          Valider
          {isSubmitting && <CircularProgress />}
        </Button>
        <Button variant="contained" type="button" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default CustomForm
