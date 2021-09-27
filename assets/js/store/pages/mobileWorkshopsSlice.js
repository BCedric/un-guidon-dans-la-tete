import { createSlice } from '@reduxjs/toolkit'
import Http from 'services/Http'

import { mobileWorkshopApi } from 'constants/api-const'

export const mobileWorkshopsSlice = createSlice({
  name: 'menu',
  initialState: {
    value: []
  },
  reducers: {
    setMobileWorkshops: (state, action) => {
      state.value = action.payload
    }
  }
})

export default mobileWorkshopsSlice.reducer

export const { setMobileWorkshops } = mobileWorkshopsSlice.actions

export const fetchMobileWorkshops = (dispatch) =>
  Http.get(mobileWorkshopApi.mobileWorkshops()).then((mobileWorkshops) =>
    dispatch(setMobileWorkshops(mobileWorkshops))
  )

export const postMobileWorkshop = (mobileWorkshop, dispatch) =>
  Http.post(mobileWorkshopApi.mobileWorkshops(), mobileWorkshop).then(
    (mobileWorkshops) => dispatch(setMobileWorkshops(mobileWorkshops))
  )
export const putMobileWorkshop = (id, mobileWorkshop, dispatch) =>
  Http.put(mobileWorkshopApi.mobileWorkshop(id), mobileWorkshop).then(
    (mobileWorkshops) => dispatch(setMobileWorkshops(mobileWorkshops))
  )

export const deleteMobileWorkshop = (id, dispatch) =>
  Http.delete(mobileWorkshopApi.mobileWorkshop(id)).then((mobileWorkshops) =>
    dispatch(setMobileWorkshops(mobileWorkshops))
  )

export const getMobileWorkshops = ({ mobileWorkshops }) => mobileWorkshops.value
