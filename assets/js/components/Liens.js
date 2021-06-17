import React, { useEffect, useState } from 'react'

import Http from 'services/Http'

import { pageApi } from 'constants/api-const'

const Liens = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    Http.get(pageApi.page('liens')).then((res) => setContent(res.content))
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: content }}></div>
}

export default Liens
