import Home from 'components/Home'
import Contact from 'components/Contact'
import Liens from 'components/Liens'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/contact',
    component: Contact,
    name: 'Contact'
  },
  {
    path: '/liens',
    component: Liens,
    name: 'Liens'
  }
]

export default routes
