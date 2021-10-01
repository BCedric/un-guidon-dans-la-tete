import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import EntitiesAdmin from 'generics/components/EntitiesAdmin'

import { fetchMedias, getMedias, deleteMedia } from 'store/pages/mediaSlice'

import MediaForm from './MediaForm'
import { Button } from '@mui/material'

const MediaAdmin = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchMedias(dispatch)
  }, [])

  const getMediaURL = (media) =>
    `${window.BASE_URL}/api/media/${media.filename}`

  return (
    <div>
      <EntitiesAdmin
        title="Medias"
        FormComponent={MediaForm}
        propertiesSelector={getMedias}
        properties={[
          'id',
          'type',
          {
            name: 'Nom du fichier',
            render: (entity) => entity.filename
          },
          {
            name: 'URL',
            render: (entity) => (
              <div>
                <span>{getMediaURL(entity)}</span>
                <Button onClick={() => {}}>
                  <CopyToClipboard text={getMediaURL(entity)}>
                    <span className="material-icons">content_copy</span>
                  </CopyToClipboard>
                </Button>
              </div>
            )
          },
          {
            name: 'aperçu',
            render: (entity) =>
              entity.type.includes('image') ? (
                <img
                  className="media-img-preview"
                  src={`${window.BASE_URL}/api/media/${entity.filename}`}
                />
              ) : (
                ''
              )
          }
        ]}
        deleteEntity={deleteMedia}
        canEdit={false}
        filterFunction={(value) => (entity) =>
          entity.filename.toLowerCase().includes(value.toLowerCase())}
      />
    </div>
  )
}

export default MediaAdmin
