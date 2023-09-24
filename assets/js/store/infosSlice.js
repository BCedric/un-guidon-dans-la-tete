import { createSlice } from '@reduxjs/toolkit'
import Http from 'services/Http'

import { infosApi } from 'constants/api-const'

export const infosSlice = createSlice({
  name: 'medias',
  initialState: {
    value: [],
    hasFetch: false
  },
  reducers: {
    setInfos: (state, action) => {
      state.value = action.payload
    },
    setHasFetch: (state, action) => {
      state.hasFetch = action.payload
    }
  }
})

export default infosSlice.reducer

export const { setInfos, setHasFetch } = infosSlice.actions

export const fetchInfos = (dispatch) =>
  Http.get(infosApi.infos()).then(
    (infos) => (dispatch(setInfos(infos)), dispatch(setHasFetch(true)))
  )

export const putInfo = (id, info, dispatch) =>
  Http.put(infosApi.info(id), info).then((infos) => dispatch(setInfos(infos)))

export const getInfos = ({ infos }) => infos.value
export const getHasFetchInfos = ({ infos }) => infos.hasFetch
