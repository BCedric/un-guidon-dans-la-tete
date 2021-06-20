import React from 'react'

import EntitiesAdmin from 'generics/components/EntitiesAdmin'

import { getPages } from 'store/pages/pagesSlice'

import PageForm from './PageForm'

const PagesAdmin = () => {
  return (
    <div>
      <EntitiesAdmin
        title="Pages"
        FormComponent={PageForm}
        propertiesSelector={getPages}
        properties={['tag', 'id']}
      />
    </div>
  )
}

export default PagesAdmin
