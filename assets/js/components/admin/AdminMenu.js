import React, { useState } from 'react'

const AdminMenu = ({ items }) => {
  const [itemSelected, setItemSelected] = useState(null)
  return (
    <div className="admin-container">
      <ul className="admin-menu">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => setItemSelected(item)}
            className={`clickable ${itemSelected === item ? 'active' : ''}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
      {itemSelected != null && (
        <div className="admin-content">
          <itemSelected.component />
        </div>
      )}
    </div>
  )
}

export default AdminMenu
