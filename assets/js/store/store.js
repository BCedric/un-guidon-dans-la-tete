import { configureStore } from '@reduxjs/toolkit'

import mediasReducer from './pages/mediaSlice'
import pagesReducer from './pages/pagesSlice'
import menuReducer from './pages/menuSlice'
import infosRedicer from './pages/infosSlice'

export default configureStore({
  reducer: {
    pages: pagesReducer,
    medias: mediasReducer,
    menu: menuReducer,
    infos: infosRedicer
  }
})
