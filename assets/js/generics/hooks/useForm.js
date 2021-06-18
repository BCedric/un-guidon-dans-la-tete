import { useState } from 'react'

const useForm = () => {
  const [formFields, setFormFields] = useState({})
  const [defaultValues, setDefaultValues] = useState({})
  const [fieldsValidity, setFieldsValidity] = useState({})
  const [modifiedFields, setModifiedFields] = useState({})

  const getFormField = (
    key,
    defaultValue,
    required = false,
    validation = (_) => true
  ) => {
    // key === 'messageValue' && console.log('getFormField', key, !(key in formFields), formFields);

    if (!(key in formFields)) {
      setFormFields({ ...formFields, [key]: defaultValue })
      setDefaultValues({ ...defaultValues, [key]: defaultValue })
      setFieldsValidity({ ...fieldsValidity, [key]: false })
      return [
        formFields[key],
        (value) => setFormFields({ ...formFields, [key]: value }),
        false
      ]
    }

    const isValid = required
      ? formFields[key] !== defaultValue && validation(formFields[key])
      : validation(formFields[key]) || formFields[key] === defaultValue

    fieldsValidity[key] !== isValid &&
      setFieldsValidity({ ...fieldsValidity, [key]: isValid })

    const setField = (value) => {
      if (value === defaultValues[key]) {
        setModifiedFields({ ...modifiedFields, [key]: false })
      } else {
        setModifiedFields({ ...modifiedFields, [key]: true })
      }
      setFormFields({ ...formFields, [key]: value })
    }

    return [formFields[key], setField, isValid]
  }

  const isFormValid = Object.keys(fieldsValidity).every(
    (key) => fieldsValidity[key]
  )
  const isFormDirty = Object.keys(modifiedFields).some(
    (key) => modifiedFields[key]
  )
  const initFormFields = (object) => {
    setFormFields(object)
    setDefaultValues(object)
  }
  return {
    resetForm: () => setFormFields(defaultValues),
    getFormField,
    isFormValid,
    initFormFields,
    modifiedFields,
    isFormDirty
  }
}

export default useForm
