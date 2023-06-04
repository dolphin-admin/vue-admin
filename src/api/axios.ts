import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

import router from '@/router'
import { useThemeStore } from '@/store'
import type { PageModel, PageResponseData, ResponseData } from '@/types'

const themeStore = useThemeStore()

const { message } = createDiscreteApi(['message'], {
  configProviderProps: {
    theme: themeStore.theme,
    locale: themeStore.locale,
    dateLocale: themeStore.dateLocale
  }
})

const LOCAL_STORAGE_TOKEN = 'access_token'

const axiosConfig = {
  baseURL: import.meta.env.BASE_URL,
  timeout: 30000,
  withCredentials: true
}

enum ResponseStatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

class Request {
  instance: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (req: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
        if (token) {
          req.headers.common.Authorization = `Bearer ${token}`
        }
        return req
      },
      (err: AxiosError) => Promise.reject(err)
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res.data,
      (err: AxiosError) => {
        const { response } = err
        if (response) {
          Request.handleCode(response.status)
        }
        if (!window.navigator.onLine) {
          console.error('Network Error!')
          router.replace('/404')
        }
        return Promise.reject(response)
      }
    )
  }

  static handleCode(code: number): void {
    switch (code) {
      case ResponseStatusCode.BAD_REQUEST:
        console.error('400: Bad Request!')
        break
      case ResponseStatusCode.UNAUTHORIZED:
        localStorage.removeItem(LOCAL_STORAGE_TOKEN)
        console.error('401: Unauthorized!')
        message.error('401: Unauthorized!')
        break
      case ResponseStatusCode.FORBIDDEN:
        console.error('403: Forbidden!')
        message.error('403: Forbidden!')
        break
      case ResponseStatusCode.NOT_FOUND:
        console.error('404: NotFound!')
        break
      case ResponseStatusCode.CONFLICT:
        console.error('409: Conflict!')
        break
      default:
        console.error('500: Internal Server Error!')
        message.error('500: Internal Server Error!')
    }
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

  get<T>(
    url: string,
    params?: Record<string, unknown> | PageModel,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T> | PageResponseData<T>> {
    return this.instance.get(url, { params, ...config })
  }

  post<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.post(url, data, config)
  }

  put<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.put(url, data, config)
  }

  delete<T>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.delete(url, { params, ...config })
  }
}

export default new Request(axiosConfig)
