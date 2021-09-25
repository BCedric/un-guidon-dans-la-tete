import React from 'react'
import AdminMenu from './AdminMenu'
import InfosAdmin from './infos/InfosAdmin'

import MediaAdmin from './media/MediaAdmin'
import MenuAdmin from './menu/MenuAdmin'
import PagesAdmin from './pages/PagesAdmin'

const menuAdminItems = [
  { component: PagesAdmin, label: 'Pages' },
  { component: MediaAdmin, label: 'Media' },
  { component: MenuAdmin, label: 'Menu' },
  { component: InfosAdmin, label: 'Infos générales' }
]

const Admin = () => {
  return <AdminMenu items={menuAdminItems}></AdminMenu>
}

export default Admin
