import { message } from 'antd'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义通用的响应数据结构
export interface ResponseData<T = any> {
  httpCode: number
  status: string
  message: string
  data: T
}

// 扩展 AxiosRequestConfig，添加自定义配置
interface CustomRequestConfig extends AxiosRequestConfig {
  needToken?: boolean // 是否需要 token
  returnNativeResponse?: boolean // 是否返回原生响应
  returnCodeDataMessage?: boolean // 是否返回 code, data, message
  retryTimes?: number // 重试次数
}

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:6002', // 从环境变量中获取 baseURL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 重试请求函数
const retryRequest = (config: CustomRequestConfig): Promise<any> => {
  if (!config.retryTimes) {
    config.retryTimes = 3 // 默认重试次数
  }

  if (config.retryTimes > 0) {
    config.retryTimes -= 1
    return instance(config)
  }

  return Promise.reject(new Error('重试次数耗尽'))
}

// 请求拦截器
instance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  (config: CustomRequestConfig) => {
    // 添加接口前缀
    // config.url = `/api/v1${config.url}`

    // 给 GET 请求加上时间戳参数，避免缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }

    // 非 GET 请求如果没有提供 data，则将 params 视为 data
    if (config.method !== 'get' && !config.data) {
      config.data = config.params
      config.params = {}
    }

    // 如果需要 token，则添加 token
    if (config.needToken !== false) {
      // 默认需要 token
      const token = localStorage.getItem('token')
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  (response: AxiosResponse<ResponseData>) => {
    // 204 无内容直接返回
    if (response.status === 204) {
      return response
    }

    // 处理响应数据
    const { data } = response
    if (data && data.httpCode !== 200) {
      message.error(data.message || '请求失败') // 使用 antd 的 message 组件
      return Promise.reject(data)
    }

    // 返回原生响应头
    if ((response.config as CustomRequestConfig).returnNativeResponse) {
      return response
    }

    // 返回 code, data, message
    if ((response.config as CustomRequestConfig).returnCodeDataMessage) {
      return {
        code: data.httpCode,
        data: data.data,
        message: data.message,
      }
    }

    // 默认返回 data
    return data
  },
  (error) => {
    const { config, response } = error

    // 如果是网络错误或超时错误，直接重试
    if (!response && (error.message === 'Network Error' || error.code === 'ECONNABORTED')) {
      return retryRequest(config as CustomRequestConfig)
    }

    // 重试请求
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (config && (config as CustomRequestConfig).retryTimes > 0) {
      return retryRequest(config as CustomRequestConfig)
    }

    // 错误处理
    if (response) {
      switch (response.status) {
        case 401:
          message.error('未授权，请登录')
          break
        case 403:
          message.error('拒绝访问')
          break
        case 404:
          message.error('请求的资源不存在')
          break
        case 500:
          message.error('服务器错误')
          break
        default:
          message.error('请求失败')
      }
    } else {
      message.error('网络错误，请检查网络连接')
    }

    return Promise.reject(error)
  },
)

// 封装请求函数
const request = {
  get: <T = any>(url: string, config?: CustomRequestConfig): Promise<T> => {
    return instance.get(url, config)
  },
  post: <T = any>(url: string, data?: any, config?: CustomRequestConfig): Promise<T> => {
    return instance.post(url, data, config)
  },
  put: <T = any>(url: string, data?: any, config?: CustomRequestConfig): Promise<T> => {
    return instance.put(url, data, config)
  },
  delete: <T = any>(url: string, config?: CustomRequestConfig): Promise<T> => {
    return instance.delete(url, config)
  },
}

export default request
