import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Header from './Header'

import { fetchPages } from 'store/pages/pagesSlice'
import { fetchMenu } from 'store/pages/menuSlice'
import { getHasFetchMenu } from 'store/pages/menuSlice'

import Router from './Router'
import Footer from './Footer'

const Root = () => {
  const dispatch = useDispatch()
  const isLoadingPages = useSelector((state) => state.pages.isLoading)
  const hasFetchPages = useSelector((state) => state.pages.hasFetch)
  const hasFetchMenu = useSelector(getHasFetchMenu)

  useEffect(() => {
    fetchPages(dispatch)
    fetchMenu(dispatch)
  }, [])

  return (
    <div>
      {hasFetchMenu && hasFetchPages && !isLoadingPages && (
        <div>
          <Router>
            <Header></Header>
          </Router>
          <Footer></Footer>
        </div>
      )}
    </div>
  )
}

export default Root
