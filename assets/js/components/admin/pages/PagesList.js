import React from 'react'
import { useSelector } from 'react-redux'
import { getPages } from 'store/pages/pagesSlice'

const PagesList = () => {
  const pages = useSelector(getPages)

  return (
    <div>
      <table>
        <tbody>
          {pages.map((page, index) => (
            <tr key={index}>
              <td>{page.tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PagesList
