import React, { useEffect } from 'react'

import Http from 'services/Http'

const Home = () => {
  useEffect(() => {
    Http.get('/reservation').then((res) => console.log(res))
  }, [])

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
