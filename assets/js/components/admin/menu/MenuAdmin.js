import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { fetchMenu, deleteMenuItem, getMenuItems } from 'store/pages/menuSlice'

import EntitiesAdmin from 'generics/components/EntitiesAdmin'

import MenuItemForm from './MenuItemForm'

const MenuAdmin = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchMenu(dispatch)
  }, [])

  const getArborescence = (item) =>
    item != null
      ? `${getArborescence(item.parent)} ${item.parent != null ? '=>' : ''} ${
          item.name
        }`
      : ''

  return (
    <div>
      <EntitiesAdmin
        title="Menu"
        FormComponent={MenuItemForm}
        propertiesSelector={getMenuItems}
        properties={[
          { name: 'nom', render: (entity) => entity.name },
          'position',
          {
            name: 'arborescence',
            render: (entity) =>
              entity.parent != null ? getArborescence(entity) : ''
          },
          {
            name: 'sous-éléments',
            render: (entity) =>
              entity.children
                .map((child) => (child.name !== '' ? child.name : child.id))
                .join(', ')
          },
          {
            name: 'page',
            render: (entity) => (entity.page != null ? entity.page.tag : '')
          }
        ]}
        deleteEntity={deleteMenuItem}
      />
    </div>
  )
}

export default MenuAdmin
