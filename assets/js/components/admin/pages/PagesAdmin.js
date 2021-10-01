import React from 'react'

import EntitiesAdmin from 'generics/components/EntitiesAdmin'

import { getPages } from 'store/pages/pagesSlice'

import PageForm from './PageForm'
import { deletePage } from 'store/pages/pagesSlice'

const PagesAdmin = () => {
  return (
    <div>
      <EntitiesAdmin
        title="Pages"
        FormComponent={PageForm}
        propertiesSelector={getPages}
        properties={['tag', 'id']}
        deleteEntity={deletePage}
        filterFunction={(value) => (entity) =>
          entity.tag.toLowerCase().includes(value.toLowerCase())}
      />
    </div>
  )
}

export default PagesAdmin
