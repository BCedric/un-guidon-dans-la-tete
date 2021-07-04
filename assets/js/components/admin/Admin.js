import React from 'react'
import AdminMenu from './AdminMenu'

import MediaAdmin from './media/MediaAdmin'
import MenuAdmin from './menu/MenuAdmin'
import PagesAdmin from './pages/PagesAdmin'

const menuAdminItems = [
  { component: PagesAdmin, label: 'Pages' },
  { component: MediaAdmin, label: 'Media' },
  { component: MenuAdmin, label: 'Menu' }
]

const Admin = () => {
  return (
    <div>
      <AdminMenu items={menuAdminItems}></AdminMenu>
    </div>
  )
}

export default Admin
