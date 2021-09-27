import { configureStore } from '@reduxjs/toolkit'

import mediasReducer from './pages/mediaSlice'
import pagesReducer from './pages/pagesSlice'
import menuReducer from './pages/menuSlice'
import infosRedicer from './pages/infosSlice'
import mobileWorkshopsReducer from './pages/mobileWorkshopsSlice'

export default configureStore({
  reducer: {
    pages: pagesReducer,
    medias: mediasReducer,
    menu: menuReducer,
    infos: infosRedicer,
    mobileWorkshops: mobileWorkshopsReducer
  }
})
