import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPages } from 'store/pages/pagesSlice'

const Menu = () => {
  const pages = useSelector(getPages)
  const [tags, setTags] = useState([])

  useEffect(() => {
    setTags(pages.map((page) => page.tag))
  }, [pages])

  return (
    <nav>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <Link to={`/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
