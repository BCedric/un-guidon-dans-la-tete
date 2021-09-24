import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { getPageByTag } from 'store/pages/pagesSlice'
import { getMenuItems } from 'store/pages/menuSlice'

const Page = ({ tag }) => {
  const pagesFilter = useSelector(getPageByTag)

  const menuItems = useSelector(getMenuItems)
  const [page, setPage] = useState(null)
  const [currentMenuItem, setCurrentMenuItem] = useState(null)

  useEffect(() => {
    setPage(pagesFilter(tag))
  }, [])

  useEffect(() => {
    if (menuItems != null && page != null) {
      setCurrentMenuItem(
        menuItems.find((item) => item.page != null && item.page.id === page.id)
      )
    }
  }, [menuItems, page])

  return (
    <div className="page-container">
      {currentMenuItem != null && <h1>{currentMenuItem.name} </h1>}
      {page != null && (
        <>
          {page.headingImg != null && (
            <img
              style={{ objectPosition: `0 ${page.headingImgPosition}%` }}
              className="page-heading-img"
              src={`${window.BASE_URL}/api/media/${page.headingImg.filename}`}
            />
          )}
        </>
      )}
      <div className="page-content">
        {page != null && (
          <>
            <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page
