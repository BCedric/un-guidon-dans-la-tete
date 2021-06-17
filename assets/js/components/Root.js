import React from 'react'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'

import routes from 'constants/routes-const'

const Root = () => {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.component}
            ></Route>
          ))}
        </Switch>
      </Router>
    </div>
  )
}

export default Root
