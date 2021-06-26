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
      <li key={index}>
        <Link to={`/${item.page.tag}`}>{item.name}</Link>
      </li>
    ) : (
      <li key={index}>
        <span>{item.name}</span>
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
    <nav>
      <ul>{menuItems.map((item, index) => renderItem(item, index, null))}</ul>
    </nav>
  )
}

export default Menu
