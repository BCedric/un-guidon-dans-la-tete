import React from 'react'

import { Button } from '@material-ui/core'

const CustomForm = ({
  children,
  onCancel = () => {},
  onSubmit = () => {},
  isFormDirty = true,
  isFormValid = true
}) => {
  const onFormSubmit = (e) => {
    e.preventDefault()
    onSubmit(e).then(onCancel)
  }

  return (
    <form onSubmit={onFormSubmit}>
      {children}
      <div className="form-buttons-container">
        <Button
          variant="contained"
          type="submit"
          disabled={!isFormDirty || !isFormValid}
        >
          Valider
        </Button>
        <Button variant="contained" type="button" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  )
}

export default CustomForm
