import Http from '@/http'

export default {
  // github 授权登录获取Token
  login (params) {
    var url = '/api/v1/oauth2/authorise'
    return Http.post(url, params)
  },
  // 通过code换取openid
  callback (params) {
    var url = '/api/v1/oauth2/callback'
    return Http.post(url, params)
  }
}
