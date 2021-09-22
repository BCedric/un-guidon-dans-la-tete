import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { HashRouter, Route, Switch, useParams } from 'react-router-dom'

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
    window.addEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (e) => {
    setScroll(window.scrollY)
  }

  const [scroll, setScroll] = useState(0)
  const isMenuFixe = scroll > 270

  useEffect(() => {
    fetchPages(dispatch)
    fetchMenu(dispatch)
  }, [])

  return (
    <div>
      {hasFetchMenu && hasFetchPages && !isLoadingPages && (
        <div className="app-root">
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
