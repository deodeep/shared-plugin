export interface MyResponseType {
  access_token: string
  id_token: string
  scope: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
}
export interface UserSearchContainerProps {
  onSearch: (searchTerm: string) => Promise<User[]>
}
