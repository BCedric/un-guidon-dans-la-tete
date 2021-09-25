import React from 'react'
import { useSelector } from 'react-redux'
import { getInfos } from 'store/pages/infosSlice'

const Footer = () => {
  const infos = useSelector(getInfos)
  const mail = infos.find((info) => info.tag === 'mail')
  const phone = infos.find((info) => info.tag === 'phone')
  const facebook = infos.find((info) => info.tag === 'facebook')

  return (
    <footer>
      <span>{phone.value}</span>
      <a href={facebook.value} target="_blank">
        <img src="https://img.icons8.com/ios-glyphs/30/000000/facebook-circled--v1.png" />
      </a>
      <span>{mail.value}</span>
    </footer>
  )
}

export default Footer
