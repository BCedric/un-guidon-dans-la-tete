import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'

import { getPages } from 'store/pages/pagesSlice'
import routes from 'constants/routes-const'

import Page from './Page'
import { getMenuItems } from '../store/pages/menuSlice'

const Router = (props) => {
  const pages = useSelector(getPages)
  const menuItems = useSelector(getMenuItems)
  const location = useLocation()
  const isInAdmin = location.pathname.includes('admin')

  const firstElement = () => {
    if(menuItems.length === 0) {
      return null
    }
    const item = menuItems[0]
    return item.children.length > 0 ? item.children[0].page : item.page
  }

  return (
    <>
      {props.children}
      <div className={`content ${props.isMenuFixe ? 'menu-fixed' : ''}`}>
        {!isInAdmin && <div className="margin-left"></div>}
        <Switch>
          {pages.length > 0 && (
            <Route
              exact
              path={`/`}
              render={(props) => <Page {...props} tag={firstElement().tag} />}
            ></Route>
          )}
          {pages.map((page, index) => (
            <Route
              exact
              key={index}
              path={`/${page.tag}`}
              render={(props) => <Page {...props} tag={page.tag} />}
            ></Route>
          ))}
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.component}
            ></Route>
          ))}
        </Switch>
        {!isInAdmin && <div className="margin-right"></div>}
      </div>
    </>
  )
}

export default Router
