import { GlobalEnvConfig } from '@/constants'

export const getServerFileUrl = (path: string) => `${GlobalEnvConfig.BASE_API_PROXY}/${path}`
