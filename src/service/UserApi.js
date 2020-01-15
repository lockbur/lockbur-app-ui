/**
 * Created by wangkun23 on 2018/3/29.
 */
import Http from '@/http'

export default {
  // 当前登录用户信息
  getAccount () {
    var url = '/api/v1/account/user'
    return Http.get(url)
  },
  updateAccount (user) {
    var url = '/api/v1/settings/account'
    return Http.post(url, user)
  },
  // 用户信息
  getUserInfo (username) {
    var url = '/api/v1/users/'
    return Http.get(url + username)
  },
  // 用户评论信息
  getUserComments () {
    var url = '/api/v1/user/comments/me'
    return Http.get(url)
  },
  // 查询当前登录用户信息
  getProfile () {
    var url = '/api/v1/settings/profile'
    return Http.get(url)
  },
  // 更新用户信息
  updateProfile (userInfo) {
    var url = '/api/v1/settings/profile'
    return Http.post(url, userInfo)
  },
  /**
   * 用户操作信息
   * **/
  // 添加star
  addStar (wallpaperId) {
    var url = '/api/v1/user/star/' + wallpaperId
    return Http.post(url)
  },
  // 创建用户个人收藏夹
  createCollection (name) {
    var collection = {
      name: name
    }
    var url = '/api/v1/user/collection/create'
    return Http.post(url, collection)
  },
  // 用户个人收藏夹
  getCollections (username) {
    var url = '/api/v1/user/collections'
    return Http.get(url)
  },
  // 添加到收藏夹
  addFavorite (collectionId, wallpaperId) {
    var wallpaper = {
      wallpaperId: wallpaperId
    }
    var url = '/api/v1/user/favorite/' + collectionId
    return Http.post(url, wallpaper)
  },
  // 用户关注和粉丝
  follow (username) {
    var url = '/api/v1/user/follow/' + username
    return Http.post(url)
  },
  unFollow (username) {
    var url = '/api/v1/user/unFollow/' + username
    return Http.post(url)
  },
  // 论坛
  newPost (boardId, post) {
    var url = '/api/v1/user/board/' + boardId + '/post'
    return Http.post(url, post)
  }
}
