import React from 'react'
import Menu from './Menu'

import logo from 'imgs/logo.png'

const Header = ({ isMenuFixe = false }) => {
  return (
    <div className="header">
      <img src={logo} />
      <Menu className={isMenuFixe ? 'fixe' : ''} />
    </div>
  )
}

export default Header
