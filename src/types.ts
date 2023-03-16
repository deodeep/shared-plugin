import { ReactNode } from 'react'

export interface AppleLoginProps {
  clientId: string
  redirectURI: string
  autoLoad?: boolean
  scope?: string
  state?: string
  responseType?: string | 'code' | 'id_token'
  responseMode?: string | 'query' | 'fragment' | 'form_post'
  nonce?: string
  usePopup?: boolean
  style?: Record<string, unknown>
  designProp?: {
    height?: number
    width?: number
    color?: string | 'white' | 'black'
    border?: boolean
    type?: string | 'sign-in' | 'continue'
    border_radius?: number
    scale?: number
    locale?: string
  }
  callback?: (d: any) => void
  render?: (props: {
    handleAppleSignIn: (e?: any) => void
    disabled?: boolean
  }) => JSX.Element
}

export interface GoogleSignInProps {
  clientId: string
  onSuccess: (response: any) => void
  onFailure: (error: any) => void
  style?: Record<string, unknown>
  images?: string
}

// SEARCH

export interface User {
  id: number
  name: string
  username: string
  email: string
}

export interface SearchProps {
  onSearch: (searchTerm: string) => Promise<User[]>
}
