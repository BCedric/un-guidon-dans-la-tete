import React from 'react'
import Menu from './Menu'

import logo from 'imgs/logo.png'

const Header = () => {
  return (
    <div className="header">
      <img src={logo} />
      <Menu />
    </div>
  )
}

export default Header
