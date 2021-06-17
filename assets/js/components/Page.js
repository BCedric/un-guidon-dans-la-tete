import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { getPageByTag } from 'store/pages/pagesSlice'

const Page = ({ tag }) => {
  const pagesFilter = useSelector(getPageByTag)

  const [page, setPage] = useState(null)
  useEffect(() => {
    setPage(pagesFilter(tag))
  }, [])

  useEffect(() => {
    console.log(page)
  }, [page])

  return (
    <div>
      {page != null && (
        <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
      )}
    </div>
  )
}

export default Page
