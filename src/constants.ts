// APLLE SIGN-IN
export const RESPONSE_MODE = 'query'
export const PL = /\+/g // Regex for replacing addition symbol with a space
export const SEARCH = /([^&=]+)=?([^&]*)/g
export const APPLE_AUTH_API =
  'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/'
export const CHECK_AUTHORIZATION = 'https://appleid.apple.com/auth/authorize?'
export const APPLE_IMAGE_URL = 'https://appleid.cdn-apple.com/appleid/button?'

// GOOGLE SIGN-IN

export const GRANT_TYPE = 'authorization_code'
export const TOKEN_URL = 'https://oauth2.googleapis.com/token'
export const SCOPE_URL =
  'https://www.googleapis.com/auth/drive.metadata.readonly'
export const CLIENT_SECRET = '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'
export const AUTH_TOKEN_URL = 'https://oauth2.googleapis.com/tokeninfo'
export const HEADER = {
  'Content-Type': 'application/json'
}
export const SCOPE = 'profile email'
export const AUTH_ERROR = 'Authorization failed.'
export const GOOGLE_BUTTON_TEXT = 'Sign in with Google'
export const LOADING_TEXT = 'Loading...'

// REUSABLE CONSTANTS

export const RESPONSE_TYPE = 'code'
export const FUNCTION = 'function'
export const LOCALE = 'en-US'
export const REDIRECT_URI = window.location.origin

//TYPE CONSTANT

export const QUERY_STRING_ERROR = 'Error while creating query string'
