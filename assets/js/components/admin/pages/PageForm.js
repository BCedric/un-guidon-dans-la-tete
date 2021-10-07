import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

import useForm from 'generics/hooks/useForm'
import CustomForm from 'generics/components/CustomForm'
import Wysiwyg from 'generics/components/Wysiwyg'

import { postPage, putPage } from 'store/pagesSlice'
import { getMedias, fetchMedias } from 'store/mediaSlice'

const PageForm = ({ cancel, entity }) => {
  const { resetForm, getFormField, initFormFields, isFormValid } = useForm()

  const [tag, setTag] = getFormField('tag', '', true)
  const [content, setContent] = useState('')
  const [hasInit, setHasInit] = useState(false)
  const [img, setImg] = useState(-1)
  const [headingImgPosition, setHeadingImgPosition] = useState(50)

  const medias = useSelector(getMedias)
  const imgs = medias.filter((media) => media.type.includes('image'))

  const dispatch = useDispatch()

  useEffect(() => {
    if (medias.length === 0) {
      fetchMedias(dispatch)
    }
  }, [])

  useEffect(() => {
    if (entity != null) {
      initFormFields({
        tag: entity.tag
      })
      setImg(entity.headingImg != null ? entity.headingImg.id : -1)
      setContent(entity.content)
      setHeadingImgPosition(entity.headingImgPosition)
    }
    setHasInit(true)
  }, [entity])

  const closeForm = () => {
    resetForm()
    cancel()
  }

  const submit = (e) => {
    const newPage = {
      tag,
      content,
      headingImg: img === -1 ? null : img,
      headingImgPosition
    }
    if (entity == null) {
      return postPage(newPage, dispatch)
    } else {
      return putPage(entity.id, newPage, dispatch)
    }
  }

  return (
    <>
      <CustomForm
        onSubmit={submit}
        onCancel={closeForm}
        isFormValid={isFormValid}
      >
        <div className="form-line align-end">
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
          <FormControl>
            <InputLabel htmlFor="heading-image-position">
              Position de l'image d'entête
            </InputLabel>
            <Input
              id="heading-image-position"
              type="number"
              value={headingImgPosition}
              onChange={(e) => setHeadingImgPosition(e.target.value)}
              disabled={img === -1}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
          </FormControl>
        </div>
        {hasInit && (
          <Wysiwyg
            onChange={(val) => setContent(val)}
            value={content}
            parentProperty={entity}
          />
        )}
      </CustomForm>
    </>
  )
}

export default PageForm
