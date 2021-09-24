import React from 'react'
import { Link } from 'react-router-dom'

import Menu from './Menu'

import logo from 'imgs/logo.png'

const Header = ({ isMenuFixe = false }) => {
  return (
    <div className="header">
      <Link to={`/`}>
        <img src={logo} />
      </Link>
      <Menu className={isMenuFixe ? 'fixe' : ''} />
    </div>
  )
}

export default Header
