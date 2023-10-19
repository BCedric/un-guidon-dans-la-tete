import React from 'react'
import AdminMenu from './AdminMenu'
import InfosAdmin from './infos/InfosAdmin'
import LoginAdmin from './LoginAdmin'

import MediaAdmin from './media/MediaAdmin'
import MenuAdmin from './menu/MenuAdmin'
import MobileWorkshopsAdmin from './mobile-workshops/MobileWorkshopsAdmin'
import PagesAdmin from './pages/PagesAdmin'

const menuAdminItems = [
  { component: PagesAdmin, label: 'Pages' },
  { component: MediaAdmin, label: 'Media' },
  { component: MenuAdmin, label: 'Menu' },
  { component: InfosAdmin, label: 'Infos générales' }
]

const Admin = () => {
  return (
    <LoginAdmin>
      <AdminMenu items={menuAdminItems}></AdminMenu>
    </LoginAdmin>
  )
}

export default Admin
