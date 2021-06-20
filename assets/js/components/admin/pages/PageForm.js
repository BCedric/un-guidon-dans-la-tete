import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { TextField } from '@material-ui/core'

import useForm from 'generics/hooks/useForm'
import CustomForm from 'generics/components/CustomForm'
import Wysiwyg from 'generics/components/Wysiwyg'

import { postPage, putPage } from 'store/pages/pagesSlice'

const PageForm = ({ cancel, entity }) => {
  const { resetForm, getFormField, initFormFields, isFormValid, isFormDirty } =
    useForm()

  const [tag, setTag] = getFormField('tag', '', true)
  const [content, setContent] = getFormField('content', '')

  const dispatch = useDispatch()

  useEffect(() => {
    initFormFields({
      tag: entity != null ? entity.tag : '',
      content: entity != null ? entity.content : ''
    })
  }, [entity])

  const closeForm = () => {
    resetForm()
    cancel()
  }

  const submit = (e) => {
    e.preventDefault()
    if (entity == null) {
      postPage({ tag, content }, dispatch).then(closeForm)
    } else {
      putPage(entity.id, { tag, content }, dispatch).then(closeForm)
    }
  }

  return (
    <>
      <CustomForm
        onSubmit={submit}
        onCancel={cancel}
        isFormDirty={isFormDirty}
        isFormValid={isFormValid}
      >
        <TextField
          label="Tag"
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Wysiwyg onChange={(val) => setContent(val)} value={content} />
      </CustomForm>
    </>
  )
}

export default PageForm
