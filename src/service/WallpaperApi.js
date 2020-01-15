import Http from '@/http'

export default {
  //首页图片
  getTop: function () {
    var url = "/api/v1/wallpaper/top";
    return Http.get(url);
  },
  //发现
  getDiscover: function (page) {
    var url = "/api/v1/wallpaper/discover";
    return Http.get(url + "?page=" + page)
  },
  //random
  getRandom: function (page) {
    var url = "/api/v1/wallpaper/random";
    return Http.get(url + "?page=" + page)
  },
  //detail
  getWallpaper: function (wallpaperId) {
    var url = "/api/v1/wallpaper/" + wallpaperId;
    return Http.get(url);
  },
  //comments
  publishComment: function (wallpaperId, comment) {
    var url = "/api/v1/user/comments/publish/" + wallpaperId;
    return Http.post(url, comment);
  },
  getComments: function (wallpaperId, page) {
    var url = "/api/v1/comments/wallpaper/" + wallpaperId + "/" + page;
    return Http.get(url);
  }
}
