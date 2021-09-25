import { createSlice } from '@reduxjs/toolkit'
import Http from 'services/Http'

import { infosApi } from 'constants/api-const'

export const infosSlice = createSlice({
  name: 'medias',
  initialState: {
    value: []
  },
  reducers: {
    setInfos: (state, action) => {
      state.value = action.payload
    }
  }
})

export default infosSlice.reducer

export const { setInfos } = infosSlice.actions

export const fetchInfos = (dispatch) =>
  Http.get(infosApi.infos()).then((infos) => dispatch(setInfos(infos)))

export const putInfo = (id, info, dispatch) =>
  Http.put(infosApi.info(id), info).then((infos) => dispatch(setInfos(infos)))

export const getInfos = ({ infos }) => infos.value
export const getHasFetchInfos = ({ infos }) => infos.value.length > 0
