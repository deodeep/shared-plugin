# shared-plugin

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/shared-plugin.svg)](https://www.npmjs.com/package/shared-plugin) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save shared-plugin
```

## Usage

```tsx
import React, { Fragment, useEffect, useState } from 'react'
import { AppleLogin, GoogleSignIn, UseSearch } from 'shared-plugin'
import { User } from './types'

const App = () => {
  const [profile, setProfile] = useState()
  const [users, setUsers] = useState<User[]>([])
  const {
    searchTerm,
    handleSearchTermChange,
    searchResults,
    isLoading,
    error
  } = UseSearch({
    onSearch: async (searchTerm: string) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?id=${searchTerm}`
      )
      const data = await response.json()
      console.log(response)
      return data
    }
  })
  useEffect(() => {
    setUsers(searchResults)
  }, [searchResults])

  const handleGoogleSuccess = (response: any) => {
    if (response) {
      setProfile(response.name)
    }
  }

  const handleGoogleFailure = (error: any) => {
    console.warn(error)
  }

  return (
    <Fragment>
      <div style={{ textAlign: 'center' }}>
        <h1>Apple Login</h1>
        <AppleLogin
          clientId={'testserviceid.com.ghostchillies.testapp'}
          redirectURI={'https://test-app.com/redirect'}
          callback={(res: any) => console.log(res)}
          style={{
            color: 'red',
            backgroundColor: 'skyblue',
            border: '0px solid',
            padding: '10px',
            borderRadius: '0.8rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        />

        <br />

        <h1>Google Login</h1>
        {profile ? <h3>{profile} Signed In</h3> : ''}
        <GoogleSignIn
          clientId='148661544175-76vd85dtqoe9vuainomlhao8ugsgt3kp.apps.googleusercontent.com'
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          style={{
            color: 'red',
            backgroundColor: 'skyblue',
            border: '0px solid',
            padding: '10px',
            borderRadius: '0.8rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          images='https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227'
        />

        <br />

        <h1> Search</h1>
        <div>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
          />
          {isLoading && <div>Loading...</div>}
          {error && error.length && error && <div>{error}</div>}
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <div key={user.id}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  )
}

export default App
```

## License

MIT © [](https://github.com/)
