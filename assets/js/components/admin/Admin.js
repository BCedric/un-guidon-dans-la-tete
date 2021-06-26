import React from 'react'

import MediaAdmin from './media/MediaAdmin'
import MenuAdmin from './menu/MenuAdmin'
import PagesAdmin from './pages/PagesAdmin'

const Admin = () => {
  return (
    <div>
      <PagesAdmin />
      <MediaAdmin />
      <MenuAdmin />
    </div>
  )
}

export default Admin
