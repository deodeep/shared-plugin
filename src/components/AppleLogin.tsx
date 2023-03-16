import React, { useEffect } from 'react'
import {
  CHECK_AUTHORIZATION,
  PL,
  RESPONSE_MODE,
  RESPONSE_TYPE,
  SEARCH
} from '../constants'
import { generateQueryString, useHandleCallback } from '../helper'
import { AppleLoginProps } from '../types'
import useScript from '../useScript'

declare const AppleID: any

export const AppleLogin = (props: AppleLoginProps) => {
  const {
    clientId,
    redirectURI,
    state = '',
    render,
    responseMode = RESPONSE_MODE,
    responseType = RESPONSE_TYPE,
    nonce,
    callback,
    scope,
    autoLoad = false,
    usePopup = false,
    style
  } = props

  const [loaded] = useScript(
    `https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/${
      (props && props.designProp && props.designProp.locale) || 'en-US'
    }/appleid.auth.js`
  )

  const handleAppleSignIn = async (e: any = null) => {
    if (e) {
      e.preventDefault()
    }
    if (!usePopup) {
      window.location.href = `${CHECK_AUTHORIZATION}${generateQueryString({
        response_type: responseType,
        response_mode: responseMode,
        client_id: clientId,
        redirect_uri: encodeURIComponent(redirectURI),
        state,
        nonce,
        scope: responseMode === RESPONSE_MODE ? '' : scope
      })}`
    } else {
      try {
        const data = await AppleID.auth.signIn()
        useHandleCallback(callback, data, null)
      } catch (err) {
        useHandleCallback(callback, null, err)
      }
    }
  }

  useEffect(() => {
    if (!usePopup) {
      if (autoLoad) {
        handleAppleSignIn()
      }

      if (
        typeof callback === 'function' &&
        responseMode === RESPONSE_MODE &&
        responseType === RESPONSE_TYPE &&
        window &&
        window.location
      ) {
        let match
        const pl = PL,
          search = SEARCH,
          decode = (s: any) => {
            return decodeURIComponent(s.replace(pl, ' '))
          },
          query = window.location.search.substring(1)

        let urlParams = {}
        while ((match = search.exec(query))) {
          urlParams[decode(match[1])] = decode(match[2])
        }
        if (urlParams[RESPONSE_TYPE]) {
          callback({
            code: urlParams[RESPONSE_TYPE]
          })
        }
      }
    }
    return () => {}
  }, [])

  useEffect(() => {
    if (usePopup && loaded) {
      AppleID.auth.init({
        clientId,
        scope,
        redirectURI:
          redirectURI ||
          `${location.protocol}//${location.host}${location.pathname}`,
        state,
        nonce,
        usePopup
      })

      // Call on auto load.
      if (autoLoad) {
        handleAppleSignIn()
      }
    }
    return () => {}
  }, [loaded, usePopup])

  if (typeof render === 'function') {
    return render({ handleAppleSignIn })
  }

  return (
    <button
      id='appleid-signin'
      onClick={handleAppleSignIn}
      style={{ ...style }}
    >
      <p>Apple Sign In</p>
    </button>
  )
}
