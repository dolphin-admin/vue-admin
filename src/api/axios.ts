import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'

import { errorMessageMap, StatusCode } from '@/constants'
import router from '@/router'
import type { BaseResponse, PageModel, Response } from '@/types'

interface PendingTask {
  config: AxiosRequestConfig | undefined
  resolve: (value: unknown) => void
}

const { t } = i18n.global

const langStore = useLangStore()
const themeStore = useThemeStore()

const { message } = createDiscreteApi(['message'], {
  configProviderProps: {
    theme: themeStore.naiveTheme,
    locale: langStore.locale,
    dateLocale: langStore.dateLocale
  }
})

class Request {
  instance: AxiosInstance

  // 是否正在刷新令牌
  refreshing = false

  // 请求队列
  requestQueue: PendingTask[] = []

  // Axios 配置
  private readonly config: AxiosRequestConfig = {
    baseURL: '/',
    timeout: 30000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  public constructor() {
    this.instance = axios.create(this.config)

    this.instance.interceptors.request.use(
      (req: InternalAxiosRequestConfig) => {
        // 设置 token
        const { url } = req
        // 如果是基础接口请求，添加 token
        if (AuthUtils.isAuthenticated() && url?.startsWith(GlobalEnvConfig.BASE_API_PREFIX)) {
          req.headers.Authorization = AuthUtils.getAuthorization()
        }
        // 设置语言 TODO: 使用 Web 标准的 Accept-Language
        req.headers.Language = LangUtils.getDefaultLang()
        return req
      },
      (err: AxiosError) => Promise.reject(err)
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res.data,
      async (err: AxiosError<Response>) => {
        const { response, config } = err
        const { data, status } = response ?? {}
        const { message: msg } = data ?? {}

        if (response && status) {
          /**
           * 处理响应状态码
           * @description 根据响应状态码进行相应的处理
           * - 401 未授权，清除 token 并跳转到登录页
           * - 403 禁止访问，提示用户无权限访问
           * - 404 未找到，跳转到 404 页面
           * - 500 服务器错误，跳转到 500 页面
           * - 其他状态码，提示错误信息
           */
          const errorMessage = msg ?? errorMessageMap.get(status) ?? 'Unknown Error!'
          switch (status) {
            case StatusCode.UNAUTHORIZED:
              if (!config?.url?.includes(AuthAPI.REFRESH_API_URL)) {
                try {
                  this.refreshing = true
                  // 认证令牌过期，需要通过刷新令牌获取新的认证令牌
                  await AuthAPI.refresh(AuthUtils.getRefreshToken())
                  this.refreshing = false
                  if (config) {
                    // 重新发起上次失败的请求
                    const res = await this.request<BaseResponse>({
                      ...config,
                      headers: { ...config.headers, Authorization: AuthUtils.getAuthorization() }
                    })
                    // 刷新了认证令牌后，将待请求队列的请求重新发起
                    if (this.requestQueue.length > 0) {
                      this.requestQueue.forEach((task) => task.resolve(this.request(task.config!)))
                      this.requestQueue = []
                    }
                    return res
                  }
                } catch (e) {
                  //
                }
              }
              // 仅刷新令牌接口需要处理认证失败
              message.error(errorMessage)
              AuthUtils.clearAccessToken()
              AuthUtils.clearRefreshToken()
              // 如果非登录页面，需要重定向到登录页，且需要带上 redirect 参数
              if (router.currentRoute.value.path !== '/login') {
                if (router.currentRoute.value.path !== '/') {
                  router.replace({
                    path: '/login',
                    query: {
                      redirect: router.currentRoute.value.fullPath
                    }
                  })
                } else {
                  router.replace('/login')
                }
              }
              break
            case StatusCode.FORBIDDEN:
              message.error(errorMessage)
              router.replace('/403')
              break
            case StatusCode.INTERNAL_SERVER_ERROR:
            case StatusCode.BAD_GATEWAY:
            case StatusCode.GATEWAY_TIMEOUT:
              message.error(errorMessage)
              router.replace('/500')
              break
            default:
          }
        }
        // 网络错误，跳转到 404 页面
        if (!window.navigator.onLine) {
          message.error(t('COMMON.NetworkError'))
          router.replace('/404')
        }
        return Promise.reject(data)
      }
    )
  }

  /**
   * 通用请求
   * @param config 请求配置
   */
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config)
  }

  /**
   * GET 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  get<T>(
    url: string,
    params?: Record<string, unknown> | PageModel,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.get(url, { params, ...config })
  }

  /**
   * POST 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  post<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }

  /**
   * PUT 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  put<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config)
  }

  /**
   * DELETE 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  delete<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.delete(url, { params, ...config })
  }

  /**
   * PATCH 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  patch<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config)
  }
}

export const httpRequest = new Request()
