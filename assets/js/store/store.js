import { configureStore } from '@reduxjs/toolkit'

import mediasReducer from './pages/mediaSlice'
import pagesReducer from './pages/pagesSlice'

export default configureStore({
  reducer: {
    pages: pagesReducer,
    medias: mediasReducer
  }
})
