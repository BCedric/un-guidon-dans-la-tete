import React, { useEffect } from 'react'
import useForm from 'generics/hooks/useForm'
import Wysiwyg from 'generics/components/Wysiwyg'
import { postPage } from 'store/pages/pagesSlice'
import { useDispatch } from 'react-redux'

const PageForm = () => {
  const { resetForm, getFormField, initFormFields, isFormValid, isFormDirty } =
    useForm()

  const [tag, setTag] = getFormField('tag', '', true)
  const [content, setContent] = getFormField('content', 'coucou')

  const dispatch = useDispatch()

  useEffect(() => {
    initFormFields({
      tag: '',
      content: ''
    })
  }, [])

  const submit = (e) => {
    e.preventDefault()
    postPage({ tag, content }, dispatch).then(() => resetForm())
  }

  return (
    <form onSubmit={submit}>
      <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
      <Wysiwyg onChange={(val) => setContent(val)} value={content} />
      <button disabled={!isFormValid}>Valider</button>
    </form>
  )
}

export default PageForm
