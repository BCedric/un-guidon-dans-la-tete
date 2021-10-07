import { configureStore } from '@reduxjs/toolkit'

import mediasReducer from './mediaSlice'
import pagesReducer from './pagesSlice'
import menuReducer from './menuSlice'
import infosRedicer from './infosSlice'
import mobileWorkshopsReducer from './mobileWorkshopsSlice'

export default configureStore({
  reducer: {
    pages: pagesReducer,
    medias: mediasReducer,
    menu: menuReducer,
    infos: infosRedicer,
    mobileWorkshops: mobileWorkshopsReducer
  }
})
