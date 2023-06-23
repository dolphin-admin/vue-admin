import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

import router from '@/router'
import { useThemeStore } from '@/store'
import type { PageModel, PageResponseData, ResponseData } from '@/types'
import { clearToken, getDefaultLang, getToken, isAuthenticated } from '@/utils'

import { axiosConfig } from './config'
import { errorMessageMap, ResponseStatusCode } from './statusCode'

const themeStore = useThemeStore()

const { message } = createDiscreteApi(['message'], {
  configProviderProps: {
    theme: themeStore.theme,
    locale: themeStore.locale,
    dateLocale: themeStore.dateLocale
  }
})

class Request {
  instance: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (req: InternalAxiosRequestConfig) => {
        if (isAuthenticated()) {
          req.headers.Authorization = `Bearer ${getToken()}`
        }
        req.headers.Language = getDefaultLang()
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
    const errorMessage = errorMessageMap.get(code) || 'Unknown Error!'
    switch (code) {
      case ResponseStatusCode.UNAUTHORIZED:
        clearToken()
        console.error(errorMessage)
        message.error(errorMessage)
        break
      case ResponseStatusCode.FORBIDDEN:
        console.error(errorMessage)
        message.error(errorMessage)
        break
      case ResponseStatusCode.BAD_REQUEST:
      case ResponseStatusCode.NOT_FOUND:
      case ResponseStatusCode.CONFLICT:
      default:
        console.error(errorMessage)
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
