import axios from 'axios'
import Storage from '@/storage'
// 允许跨域情况下携带cookie
axios.defaults.withCredentials = true
// 设置超时时间
axios.defaults.timeout = 100000
// 标识这是一个 ajax 请求
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// 添加请求拦截
axios.interceptors.request.use(config => {
  // console.log("url:" + config.url);
  let AUTH_TOKEN = Storage.get('AUTH_TOKEN');
  if (AUTH_TOKEN) {
    config.headers['Authorization'] = AUTH_TOKEN
  }
  return config
})

// 添加返回拦截处理
axios.interceptors.response.use(response => {
  if (response.data.code == '1004009') {
    Storage.removeAll();//有可能是过期了 需要重新登录
  }
  return response.data
}, (err) => {
  return Promise.reject(err)
})

export default axios
