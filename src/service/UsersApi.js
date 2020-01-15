/**
 * Created by wangkun23 on 2018/3/29.
 */
import Http from '@/http'

export default {
  //用户上传的或者采集的壁纸
  getUserUploads: function (username, page) {
    var url = "/api/v1/users/" + username + "/uploads?page=" + page;
    return Http.get(url)
  },
  //用户收藏夹
  getUserCollections: function (username) {
    var url = "/api/v1/users/" + username + "/collections";
    return Http.get(url)
  },
  //用户收藏的壁纸
  getUserFavorites: function (username, collectionId, page) {
    if (collectionId == undefined || collectionId === '') {
      var url = "/api/v1/users/" + username + "/favorites?page=" + page;
      return Http.get(url)
    } else {
      var url = "/api/v1/users/" + username + "/collections/" + collectionId + "/favorites?page=" + page;
      return Http.get(url)
    }

  },
  //用户喜欢的star 壁纸
  getUserStars: function (username, page) {
    var url = "/api/v1/users/" + username + "/stars?page=" + page;
    return Http.get(url)
  },
  //用户的粉丝
  getUserFollowers: function (username, page) {
    var url = "/api/v1/users/" + username + "/followers?page=" + page;
    return Http.get(url)
  },
  //用户的关注
  getUserFollowing: function (username, page) {
    var url = "/api/v1/users/" + username + "/following?page=" + page;
    return Http.get(url)
  }
}
