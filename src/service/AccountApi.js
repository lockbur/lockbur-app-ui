import Http from '@/http'

export default {
  //登录
  login: function (params) {
    var url = "/api/v1/login";
    return Http.post(url, params)
  },
  //注册
  register: function (params) {
    var url = "/api/v1/account/register";
    return Http.post(url, params)
  },
  //忘记密码 发送邮件的链接
  forget: function (account) {
    var url = "/api/v1/account/password/forget";
    return Http.post(url, account);
  },
  //重置密码
  reset: function (account) {
    var url = "/api/v1/account/password/reset";
    return Http.post(url, account);
  },
}
