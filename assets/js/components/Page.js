import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { getPageByTag } from 'store/pages/pagesSlice'

const Page = ({ tag }) => {
  const pagesFilter = useSelector(getPageByTag)

  const [page, setPage] = useState(null)
  useEffect(() => {
    setPage(pagesFilter(tag))
  }, [])

  console.log(page)

  return (
    <>
      {page != null && (
        <>
          {page.headingImg != null && (
            <img
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
    </>
  )
}

export default Page
