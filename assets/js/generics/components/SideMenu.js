import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import './SideMenu.scss'

const SideMenu = ({ menu }) => {
  const isItemParent = (item) => item.children.length > 0
  const hasItemPage = (item) => item.page != null
  const isItemChild = (item) => item.parent != null

  const outsideListener = (event) => {
    var specifiedElement = document.getElementById('side-menu')
    var isClickInside = specifiedElement.contains(event.target)

    if (!isClickInside && !specifiedElement.classList.contains('hidden')) {
      specifiedElement.classList.add('hidden')
    }
  }

  useEffect(() => {
    //I'm using "click" but it works with any event
    document.addEventListener('click', outsideListener)
    return () => {
      document.removeEventListener('click', outsideListener)
    }
  })

  close = () => {
    var specifiedElement = document.getElementById('side-menu')
    specifiedElement.classList.add('hidden')
  }

  const renderItem = (item, index, parent) => {
    if (
      (!hasItemPage(item) && !isItemParent(item)) ||
      (isItemChild(item) && (parent == null || item.parent != parent.id))
    ) {
      return
    }
    return !isItemParent(item) ? (
      <Link key={index} to={`/${item.page.tag}`} onClick={() => close()}>
        <li>{item.name}</li>
      </Link>
    ) : (
      <li key={index}>
        <span className="subtitle">{item.name}</span>
        <ul>
          {item.children.map((child, index) => renderItem(child, index, item))}
        </ul>
      </li>
    )
  }

  return (
    <div id="side-menu" className="side-menu hidden">
      <ul className=" first-level">
        {menu.map((item, index) => renderItem(item, index, null))}
      </ul>
    </div>
  )
}

export default SideMenu
