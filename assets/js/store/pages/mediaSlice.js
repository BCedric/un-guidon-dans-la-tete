import { createSlice } from '@reduxjs/toolkit'
import Http from 'services/Http'

import { mediaApi } from 'constants/api-const'

export const mediasSlice = createSlice({
  name: 'medias',
  initialState: {
    value: []
  },
  reducers: {
    setMedias: (state, action) => {
      state.value = action.payload
    }
  }
})

export default mediasSlice.reducer

export const { setMedias } = mediasSlice.actions

export const fetchMedias = (dispatch) =>
  Http.get(mediaApi.medias()).then((medias) => dispatch(setMedias(medias)))

export const postMedia = (media, dispatch) =>
  Http.postFormData(mediaApi.medias(), media).then((medias) =>
    dispatch(setMedias(medias))
  )

export const deleteMedia = (id, dispatch) =>
  Http.delete(mediaApi.media(id)).then((medias) => dispatch(setMedias(medias)))

export const getMedias = ({ medias }) => medias.value
