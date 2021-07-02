import React, { useEffect } from 'react'

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'

import CustomForm from 'generics/components/CustomForm'
import useForm from 'generics/hooks/useForm'
import { getPages } from 'store/pages/pagesSlice'
import { postMenuItem, getMenuItems, putMenuItem } from 'store/pages/menuSlice'

const MenuItemForm = ({ cancel, entity }) => {
  const { resetForm, getFormField, initFormFields, isFormDirty } = useForm()

  const [position, setPosition] = getFormField('position', 0)
  const [page, setPage] = getFormField('page', -1)
  const [children, setChildren] = getFormField('children', [])
  const [name, setName] = getFormField('name', '')

  const pages = useSelector(getPages)
  const menuItems = useSelector(getMenuItems).filter(
    (item) => entity == null || entity.id !== item.id
  )

  const dispatch = useDispatch()

  const isFormValid =
    (page !== -1 || (children != null && children.length > 0)) && name !== ''

  useEffect(() => {
    initFormFields({
      position: entity != null ? entity.position : 0,
      page: entity != null ? (entity.page != null ? entity.page.id : -1) : -1,
      children: entity != null ? entity.children.map((child) => child.id) : [],
      name: entity != null ? entity.name : ''
    })
  }, [entity])

  const submit = (e) => {
    const item = { position, page: page === -1 ? null : page, children, name }
    if (entity != null) {
      return putMenuItem(entity.id, item, dispatch)
    } else {
      return postMenuItem(item, dispatch)
    }
  }

  const closeForm = () => {
    cancel()
    resetForm()
  }

  const handleChildChange = (e, itemId) => {
    if (e.target.checked) {
      setChildren([...children, itemId])
    } else {
      children.splice(
        children.findIndex((id) => id === itemId),
        1
      )
      setChildren([...children])
    }
  }

  const displayChildrenFields = entity == null || entity.parent == null

  return (
    <CustomForm
      onSubmit={submit}
      onCancel={closeForm}
      isFormDirty={isFormDirty}
      isFormValid={isFormValid}
    >
      {children != null && (
        <div className="form-line align-end">
          <TextField
            label="Nom"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            label="Position"
            type="number"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          ></TextField>
          <FormControl>
            <InputLabel id="page-label">Page</InputLabel>
            <Select
              disabled={children.length > 0}
              value={page}
              onChange={(e) => setPage(e.target.value)}
              labelId="page-label"
            >
              <MenuItem value={-1}>Aucune</MenuItem>
              {pages.map((p, index) => (
                <MenuItem key={index} value={p.id}>
                  {p.tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {displayChildrenFields && (
            <div>
              <span>Enfants : </span>
              {menuItems.map(
                (item, index) =>
                  item.children.length === 0 && (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={children.includes(item.id)}
                          onChange={(e) => handleChildChange(e, item.id)}
                          name="checkedA"
                          disabled={page !== -1}
                        />
                      }
                      label={item.name !== '' ? item.name : item.id}
                    />
                  )
              )}
            </div>
          )}
        </div>
      )}
    </CustomForm>
  )
}

export default MenuItemForm
