import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import EntitiesAdmin from 'generics/components/EntitiesAdmin'

import { fetchMedias, getMedias, deleteMedia } from 'store/pages/mediaSlice'

import MediaForm from './MediaForm'

const MediaAdmin = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchMedias(dispatch)
  }, [])

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
            render: (entity) =>
              `${window.BASE_URL}/api/media/${entity.filename}`
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
      />
    </div>
  )
}

export default MediaAdmin
