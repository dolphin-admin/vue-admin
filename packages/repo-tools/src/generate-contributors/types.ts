export interface Contributor {
  contributions: number
  type: string
  login?: string
  url?: string
  avatar_url?: string
  html_url?: string
}

export interface User {
  login: string
  name: string
  avatar_url: string
  html_url: string
}
