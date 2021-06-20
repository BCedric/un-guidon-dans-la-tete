import React from 'react'

import { Button } from '@material-ui/core'

const CustomForm = (
  { children, onCancel = () => {}, onSubmit = () => {} },
  isFormDirty = true,
  isFormValid = true
) => {
  return (
    <form onSubmit={onSubmit}>
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
