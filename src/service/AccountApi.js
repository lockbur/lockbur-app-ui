import Http from '@/http'

export default {
  // 登录
  login (params) {
    var url = '/api/v1/login'
    return Http.post(url, params)
  },
  // 注册
  register (params) {
    var url = '/api/v1/account/register'
    return Http.post(url, params)
  },
  // 忘记密码 发送邮件的链接
  forget (account) {
    var url = '/api/v1/account/password/forget'
    return Http.post(url, account)
  },
  // 重置密码
  reset (account) {
    var url = '/api/v1/account/password/reset'
    return Http.post(url, account)
  },
}
