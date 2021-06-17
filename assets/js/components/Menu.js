import React, { useEffect, useState } from 'react'

import Http from 'services/Http'

import { pageApi } from 'constants/api-const'

const Menu = () => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    Http.get(pageApi.tags()).then((res) => setTags(res))
  }, [])

  return (
    <nav>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
