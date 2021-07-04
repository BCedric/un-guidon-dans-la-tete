import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'

import useForm from 'generics/hooks/useForm'
import CustomForm from 'generics/components/CustomForm'
import Wysiwyg from 'generics/components/Wysiwyg'

import { postPage, putPage } from 'store/pages/pagesSlice'
import { getMedias, fetchMedias } from 'store/pages/mediaSlice'

const PageForm = ({ cancel, entity }) => {
  const { resetForm, getFormField, initFormFields, isFormValid } = useForm()

  const [tag, setTag] = getFormField('tag', '', true)
  const [content, setContent] = useState('')
  const [hasInit, setHasInit] = useState(false)
  const [img, setImg] = useState(-1)

  const medias = useSelector(getMedias)
  const imgs = medias.filter((media) => media.type.includes('image'))

  const dispatch = useDispatch()

  useEffect(() => {
    if (medias.length === 0) {
      fetchMedias(dispatch)
    }
  }, [])

  useEffect(() => {
    initFormFields({
      tag: entity != null ? entity.tag : ''
    })
    setImg(entity.headingImg != null ? entity.headingImg.id : -1)
    setContent(entity != null ? entity.content : '')
    setHasInit(true)
  }, [entity])

  const closeForm = () => {
    resetForm()
    cancel()
  }

  const submit = (e) => {
    if (entity == null) {
      return postPage(
        { tag, content, headingImg: img === -1 ? null : img },
        dispatch
      )
    } else {
      return putPage(entity.id, { tag, content }, dispatch)
    }
  }

  return (
    <>
      <CustomForm
        onSubmit={submit}
        onCancel={closeForm}
        isFormValid={isFormValid}
      >
        <div className="form-line">
          <TextField
            label="Tag"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <FormControl>
            <InputLabel id="heading-img-label">Image d'entête</InputLabel>
            <Select
              value={img}
              onChange={(e) => setImg(e.target.value)}
              labelId="heading-img-label"
            >
              <MenuItem value={-1}>Aucune</MenuItem>
              {imgs.map((i, index) => (
                <MenuItem key={index} value={i.id}>
                  {i.filename}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {hasInit && (
          <Wysiwyg onChange={(val) => setContent(val)} value={content} />
        )}
      </CustomForm>
    </>
  )
}

export default PageForm
