import React, { useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { HashRouter } from 'react-router-dom'

import Header from './Header'

import Messages from 'generics/components/Messages'

import { fetchPages } from 'store/pagesSlice'
import { fetchMenu } from 'store/menuSlice'
import { getHasFetchMenu } from 'store/menuSlice'
import { getHasFetchInfos, fetchInfos } from 'store/infosSlice'

import Router from './Router'
import Footer from './Footer'

const Root = () => {
  const dispatch = useDispatch()
  const isLoadingPages = useSelector((state) => state.pages.isLoading)
  const hasFetchPages = useSelector((state) => state.pages.hasFetch)
  const hasFetchMenu = useSelector(getHasFetchMenu)
  const hasFetchInfos = useSelector(getHasFetchInfos)

  useEffect(() => {
    window.addEventListener('scroll', (e) => setScroll(window.scrollY))
  }, [])

  const [scroll, setScroll] = useState(0)
  const isMenuFixe = useMemo(() => {
    return scroll > 380
  }, [scroll])

  useEffect(() => {
    fetchPages(dispatch)
    fetchMenu(dispatch)
    fetchInfos(dispatch)
  }, [])

  return (
    <div>
      {hasFetchInfos && hasFetchMenu && hasFetchPages && !isLoadingPages && (
        <div className="app-root">
          <Messages />
          <HashRouter>
            <Router isMenuFixe={isMenuFixe}>
              <Header isMenuFixe={isMenuFixe}></Header>
            </Router>
          </HashRouter>
          <Footer></Footer>
        </div>
      )}
    </div>
  )
}

export default Root
