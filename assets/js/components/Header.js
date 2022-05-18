import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { getMenuItems } from 'store/menuSlice'

import SideMenu from 'generics/components/SideMenu'

import logo from 'imgs/logo.png'

const Header = ({ isMenuFixe = false }) => {
  const menuItems = useSelector(getMenuItems)

  return (
    <div className="header">
      <SideMenu menu={menuItems} />
      <Link className="header-img" to={`/`}>
        <img src={logo} />
      </Link>
    </div>
  )
}

export default Header
