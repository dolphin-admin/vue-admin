import { GlobalEnvConfig } from '@/constants'

export const getServerFileUrl = (path: string) => GlobalEnvConfig.API_PREFIX + path
