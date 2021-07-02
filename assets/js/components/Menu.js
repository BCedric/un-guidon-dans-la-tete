import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPages } from 'store/pages/pagesSlice'
import { getMenuItems } from 'store/pages/menuSlice'

const Menu = () => {
  const pages = useSelector(getPages)
  const [tags, setTags] = useState([])

  const menuItems = useSelector(getMenuItems)

  const renderItem = (item, index, parent) => {
    if (item.parent != null && (parent == null || item.parent != parent.id)) {
      return
    }
    return item.children.length === 0 ? (
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

  return (
    <div>
      <div className="bike-icon-container">
        <span className="material-icons bike-icon">directions_bike</span>
      </div>
      <nav>
        <ul className="first-level">
          {menuItems.map((item, index) => renderItem(item, index, null))}
        </ul>
      </nav>
    </div>
  )
}

export default Menu
