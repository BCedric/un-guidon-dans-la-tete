import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPages } from 'store/pagesSlice'
import { getMenuItems } from 'store/menuSlice'
import useWindowDimensions from 'generics/hooks/useWindowDimensions'
import logo from '../../imgs/collectif-secu-mort-logo100.png'

const Menu = ({ className }) => {
  const pages = useSelector(getPages)
  const [tags, setTags] = useState([])

  const menuItems = useSelector(getMenuItems)

  const isItemParent = (item) => item.children.length > 0
  const hasItemPage = (item) => item.page != null
  const isItemChild = (item) => item.parent != null

  const { width } = useWindowDimensions()

  const isSmallScreen = width < 768

  const renderItem = (item, index, parent) => {
    if (
      (!hasItemPage(item) && !isItemParent(item)) ||
      (isItemChild(item) && (parent == null || item.parent != parent.id))
    ) {
      return
    }
    return !isItemParent(item) ? (
      <Link key={index} to={`/${item.page.tag}`}>
        <li>{item.name}</li>
      </Link>
    ) : (
      <li key={index}>
        <span>{item.name}</span>
        <span className="material-icons">expand_more</span>
        <ul>
          {item.children.map((child, index) => renderItem(child, index, item))}
        </ul>
      </li>
    )
  }

  useEffect(() => {
    setTags(pages.map((page) => page.tag))
  }, [pages])

  const toggleSideMenu = (e) => {
    e.stopPropagation()
    var specifiedElement = document.getElementById('side-menu')
    if (
      specifiedElement != null &&
      specifiedElement.classList.contains('hidden')
    ) {
      specifiedElement.classList.remove('hidden')
    } else {
      specifiedElement.classList.add('hidden')
    }
  }

  return (
    <div>
      {/* <div className="bike-icon-container">
        <img src={logo} />
      </div> */}
      <nav id="menu" className={className}>
        <ul className="first-level">
          {isSmallScreen ? (
            <span
              className="sidemenu-toggle clickable material-icons"
              onClick={toggleSideMenu}
            >
              menu
            </span>
          ) : (
            menuItems.map((item, index) => renderItem(item, index, null))
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Menu
