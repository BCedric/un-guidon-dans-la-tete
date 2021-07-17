import React from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { getPages } from 'store/pages/pagesSlice'
import routes from 'constants/routes-const'

import Page from './Page'

const Router = (props) => {
  const pages = useSelector(getPages)

  return (
    <HashRouter>
      {props.children}
      <div className={`content ${props.isMenuFixe ? 'menu-fixed' : ''}`}>
        <div className="margin-left"></div>
        <Switch>
          {pages.length > 0 && (
            <Route
              exact
              path={`/`}
              render={(props) => <Page {...props} tag={pages[0].tag} />}
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
        <div className="margin-right"></div>
      </div>
    </HashRouter>
  )
}

export default Router
