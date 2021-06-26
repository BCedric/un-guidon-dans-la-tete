import { createSlice } from '@reduxjs/toolkit'
import Http from 'services/Http'

import { menuApi } from 'constants/api-const'

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    hasFetch: false
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
    setHasFetch: (state, action) => {
      state.hasFetch = action.payload
    }
  }
})

export default menuSlice.reducer

export const { setItems, setHasFetch } = menuSlice.actions

export const fetchMenu = (dispatch) =>
  Http.get(menuApi.menu())
    .then((items) => {
      dispatch(setItems(items))
    })
    .then(() => dispatch(setHasFetch(true)))

export const postMenuItem = (item, dispatch) =>
  Http.post(menuApi.menu(), item).then((items) => dispatch(setItems(items)))

export const deleteMenuItem = (id, dispatch) =>
  Http.delete(menuApi.menuItem(id)).then((items) => dispatch(setItems(items)))

export const putMenuItem = (id, item, dispatch) =>
  Http.put(menuApi.menuItem(id), item).then((items) =>
    dispatch(setItems(items))
  )

export const getMenuItems = ({ menu }) => menu.items
export const getHasFetchMenu = ({ menu }) => menu.hasFetch
