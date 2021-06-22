import React, { useEffect, useState } from 'react'

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
  const [content, setContent] = useState('')
  const [hasInit, setHasInit] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    initFormFields({
      tag: entity != null ? entity.tag : ''
    })
    setContent(entity != null ? entity.content : '')
    setHasInit(true)
  }, [entity])

  const closeForm = () => {
    resetForm()
    cancel()
  }

  const submit = (e) => {
    if (entity == null) {
      return postPage({ tag, content }, dispatch)
    } else {
      return putPage(entity.id, { tag, content }, dispatch)
    }
  }

  return (
    <>
      <CustomForm
        onSubmit={submit}
        onCancel={closeForm}
        isFormDirty={isFormDirty}
        isFormValid={isFormValid}
      >
        <TextField
          label="Tag"
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        {hasInit && (
          <Wysiwyg onChange={(val) => setContent(val)} value={content} />
        )}
      </CustomForm>
    </>
  )
}

export default PageForm
