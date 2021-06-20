import React, { useEffect, useState } from 'react'
import useForm from 'generics/hooks/useForm'
import Wysiwyg from 'generics/components/Wysiwyg'
import { postPage } from 'store/pages/pagesSlice'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@material-ui/core'

const PageForm = ({ cancel, entity }) => {
  const { resetForm, getFormField, initFormFields, isFormValid, isFormDirty } =
    useForm()

  const [tag, setTag] = getFormField('tag', '', true)
  const [content, setContent] = getFormField('content', '')
  const [hasInitForm, setHasInitForm] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    initFormFields({
      tag: entity != null ? entity.tag : '',
      content: entity != null ? entity.content : ''
    })
    setHasInitForm(true)
  }, [entity])

  const submit = (e) => {
    e.preventDefault()
    postPage({ tag, content }, dispatch).then(() => resetForm())
  }

  return (
    <>
      <form onSubmit={submit}>
        <TextField
          label="Tag"
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Wysiwyg onChange={(val) => setContent(val)} value={content} />
        <div className="form-buttons-container">
          <Button variant="contained" disabled={!isFormValid}>
            Valider
          </Button>
          <Button variant="contained" type="button" onClick={cancel}>
            Annuler
          </Button>
        </div>
      </form>
    </>
  )
}

export default PageForm
