import React, { useState } from 'react'
import {
  AUTH_ERROR,
  AUTH_TOKEN_URL,
  CLIENT_SECRET,
  GOOGLE_BUTTON_TEXT,
  GRANT_TYPE,
  LOADING_TEXT,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  SCOPE_URL,
  TOKEN_URL
} from '../constants'
import { callAPI } from '../helper'
import { GoogleSignInProps } from '../types'

export const GoogleSignIn: React.FC<GoogleSignInProps> = ({
  clientId,
  onSuccess,
  onFailure,
  style,
  images
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = () => {
    setIsLoading(true)
    const redirectUri = REDIRECT_URI
    const responseType = RESPONSE_TYPE
    const scope = SCOPE
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`
    window.location.href = authUrl
  }

  const handleTokenExchange = async (code: string) => {
    const redirectUri = REDIRECT_URI
    const grantType = GRANT_TYPE
    const tokenUrl = TOKEN_URL
    const scope = SCOPE_URL

    const payload = {
      code: code,
      client_id: clientId,
      client_secret: CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: grantType,
      scope: scope,
      token_type: 'Bearer'
    }
    try {
      const data = await callAPI(tokenUrl, payload)
      // console.log(data)
      if (data.access_token) {
        validateTooken(data.id_token)
      }
    } catch (error) {
      onFailure(error)
    }
  }

  const validateTooken = async (id_token: string) => {
    const authTokenUrl = AUTH_TOKEN_URL
    const payload = {
      id_token: id_token
    }
    try {
      const data = await callAPI(authTokenUrl, payload)
      if (data) {
        onSuccess(data)
      }
    } catch (error) {
      onFailure(error)
    }
  }

  const handleAuthCallback = () => {
    const code = new URLSearchParams(window.location.search).get(RESPONSE_TYPE)
    if (code) {
      handleTokenExchange(code)
    } else {
      onFailure(new Error(AUTH_ERROR))
    }
  }

  if (window.location.search.includes('code')) {
    handleAuthCallback()
    return null
  }

  return (
    <button onClick={handleSignIn} disabled={isLoading} style={{ ...style }}>
      {images ? <img src={images} style={{ width: '25px' }} /> : null}
      <p style={{ marginBottom: '10px' }}>
        {isLoading ? LOADING_TEXT : GOOGLE_BUTTON_TEXT}
      </p>
    </button>
  )
}
