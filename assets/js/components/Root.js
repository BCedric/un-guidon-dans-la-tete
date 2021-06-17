import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Header from './Header'

import { fetchPages } from 'store/pages/pagesSlice'
import Router from './Router'

const Root = () => {
  const dispatch = useDispatch()
  const isLoadingPages = useSelector((state) => state.pages.isLoading)
  const hasFetchPages = useSelector((state) => state.pages.hasFetch)

  useEffect(() => {
    fetchPages(dispatch)
  }, [])

  return (
    <div>
      {hasFetchPages && !isLoadingPages && (
        <div>
          <Router>
            <Header></Header>
          </Router>
        </div>
      )}
    </div>
  )
}

export default Root
