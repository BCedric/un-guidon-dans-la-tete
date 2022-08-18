import React, { useEffect, useRef, useState } from 'react'

import ReactDOMServer from 'react-dom/server'

import { useSelector } from 'react-redux'
import { getPageByTag } from 'store/pagesSlice'
import { getMenuItems } from 'store/menuSlice'
import { getInfos } from 'store/infosSlice'
import MobileWorkshopsCalendar from './MobileWorkshopsCalendar'

const Page = ({ tag }) => {
  const componentsTranslations = {
    mobile_workshops: MobileWorkshopsCalendar()
  }
  const pagesFilter = useSelector(getPageByTag)
  const infos = useSelector(getInfos)

  const menuItems = useSelector(getMenuItems)
  const [page, setPage] = useState(null)
  const [currentMenuItem, setCurrentMenuItem] = useState(null)
  const [isImgLoaded, setIsImgLoaded] = useState(false)

  const pageContent = useRef(null)
  const contentWidth =
    pageContent.current != null ? pageContent.current.offsetWidth : 0

  useEffect(() => {
    if (isImgLoaded && page != null && contentWidth > 0) {
      for (let elt of pageContent.current.children) {
        const style = window.getComputedStyle(elt)
        const marginLeft = parseInt(style.marginLeft, 10)
        if (elt.offsetWidth + marginLeft > contentWidth) {
          elt.style.marginLeft = '0px'
        }
      }
    }
  }, [pageContent, isImgLoaded, page, contentWidth])

  useEffect(() => {
    setPage(pagesFilter(tag))
  }, [])

  useEffect(() => {
    if (page != null && page.headingImg != null) {
      setIsImgLoaded(false)
    } else {
      setIsImgLoaded(true)
    }
  }, [page])

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
      var strToInsert = valueObj != null ? valueObj.value : ''
      if (componentsTranslations[strToReplace] != null) {
        strToInsert = ReactDOMServer.renderToString(
          componentsTranslations[strToReplace]
        )
      } else {
        strToInsert = valueObj != null ? valueObj.value : ''
      }
      content = content.slice(0, start) + strToInsert + content.slice(end + 2)
    }
    return content
  }

  return (
    <div className="page-container">
      {page != null && page.headingImg != null && (
        <div className="page-heading-img-container">
          <img
            style={{ objectPosition: `0 ${page.headingImgPosition}%` }}
            className="page-heading-img"
            src={`${window.BASE_URL}/api/media/${page.headingImg.filename}`}
            onLoad={(e) => setIsImgLoaded(true)}
          />
        </div>
      )}
      {isImgLoaded && (
        <>
          {currentMenuItem != null && <h1>{currentMenuItem.name} </h1>}
          {page != null && (
            <div
              ref={pageContent}
              className="page-content"
              dangerouslySetInnerHTML={{ __html: getContent() }}
            ></div>
          )}
        </>
      )}
    </div>
  )
}

export default Page
