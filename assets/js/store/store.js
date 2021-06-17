import { configureStore } from '@reduxjs/toolkit'

import pagesReducer from './pages/pagesSlice'

export default configureStore({
  reducer: {
    pages: pagesReducer
  }
})
