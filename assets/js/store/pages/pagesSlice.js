import { createSlice } from '@reduxjs/toolkit'
import Http from 'services/Http'

import { pageApi } from 'constants/api-const'

export const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    value: [],
    isLoading: false,
    hasFetch: false
  },
  reducers: {
    setPages: (state, action) => {
      state.value = action.payload
    },
    setIsLodaing: (state, action) => {
      state.isLoading = action.payload
    },
    setHasFetch: (state, action) => {
      state.hasFetch = action.payload
    }
  }
})

export default pagesSlice.reducer

export const { setPages, setIsLodaing, setHasFetch } = pagesSlice.actions

export const fetchPages = (dispatch) => {
  dispatch(setIsLodaing(true))
  return Http.get(pageApi.pages()).then((pages) => {
    dispatch(setPages(pages))
    dispatch(setIsLodaing(false))
    dispatch(setHasFetch(true))
  })
}

export const getPageByTag = (state) => (tag) =>
  state.pages.value.find((page) => page.tag === tag)

export const getPages = ({ pages }) => pages.value
