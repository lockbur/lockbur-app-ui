export default {
  // 存入值至localStorage
  put: function (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },
  // 根据key拿值
  get: function (key) {
    return JSON.parse(localStorage.getItem(key));
  },
  // 根据key删除值
  remove: function (key) {
    localStorage.removeItem(key)
  },
  // 清除所有的缓存
  removeAll: function () {
    localStorage.clear()
  }
}
