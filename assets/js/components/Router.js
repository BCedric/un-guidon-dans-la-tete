import React from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { getPages } from 'store/pages/pagesSlice'

import Page from './Page'

const Router = () => {
  const pages = useSelector(getPages)

  return (
    <HashRouter>
      <Switch>
        {pages.map((page, index) => (
          <Route
            exact
            key={index}
            path={`/${page.tag}`}
            render={(props) => <Page {...props} tag={page.tag} />}
          ></Route>
        ))}
      </Switch>
    </HashRouter>
  )
}

export default Router
