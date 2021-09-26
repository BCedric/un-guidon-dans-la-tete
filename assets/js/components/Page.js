import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { getPageByTag } from 'store/pages/pagesSlice'
import { getMenuItems } from 'store/pages/menuSlice'
import { getInfos } from 'store/pages/infosSlice'

const Page = ({ tag }) => {
  const pagesFilter = useSelector(getPageByTag)
  const infos = useSelector(getInfos)

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

  const getContent = () => {
    var content = page.content
    while (content.indexOf('[[') !== -1) {
      const start = content.indexOf('[[')
      const end = content.indexOf(']]')
      const strToReplace = content.substring(start + 2, end).trim()
      const valueObj = infos.find((info) => info.tag === strToReplace)
      const strToInsert = valueObj != null ? valueObj.value : ''
      content = content.slice(0, start) + strToInsert + content.slice(end + 2)
    }
    return content
  }

  return (
    <div className="page-container">
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
      {currentMenuItem != null && <h1>{currentMenuItem.name} </h1>}
      <div className="page-content">
        {page != null && (
          <>
            <div dangerouslySetInnerHTML={{ __html: getContent() }}></div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page
