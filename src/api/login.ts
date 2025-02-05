import { Menu, Role, User } from '@/store/auth.ts'
import request, { ResponseData } from '@/utils/request'

const Api = {
  login: '/api/system/user/login',
  logout: '/api/system/user/logout',
  captcha: '/api/system/user/captcha',
}

/**
 * 退出登录
 */
export const sendLogout = () => {
  request.get(`${Api.logout}`)
}

/**
 * 获取图片验证码
 * @param captchaKey
 */
export const sendCaptcha = (captchaKey: string) => {
  return request.get<
    ResponseData<{
      captchaKey: string
      imageBase64: string
    }>
  >(`${Api.captcha}?captchaKey=${captchaKey}`, {
    needToken: false,
  })
}

/**
 * 登录
 * @param loginInfo
 */
export const sendLogin = (loginInfo: Record<string, string>) => {
  return request.post<
    ResponseData<{
      tokenName: string
      tokenValue: string
      user: User
      menus: Menu[]
      roles: Role[]
    }>
  >(
    `${Api.login}`,
    {
      ...loginInfo,
    },
    {
      needToken: false,
    },
  )
}
