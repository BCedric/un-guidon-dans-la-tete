import React, { useState } from 'react'

import { Button, TextField } from '@mui/material'

const LoginAdmin = ({ children }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [isLogged, setIsLogged] = useState(process.env.ADMIN_LOGIN == null)

  const submit = () => {
    const loginArray = process.env.ADMIN_LOGIN.split(';')
    if (loginArray[0] === login && loginArray[1] === password) {
      setIsLogged(true)
    }
  }

  const isFormValid = password !== '' && login !== ''

  return (
    <>
      {isLogged ? (
        children
      ) : (
        <form onSubmit={submit} className="login-form">
          <TextField
            type="text"
            label="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            type="password"
            label="mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" disabled={!isFormValid}>
            Valider
          </Button>
        </form>
      )}
    </>
  )
}

export default LoginAdmin
