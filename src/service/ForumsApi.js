import Http from '@/http'

export default {
  //论坛版块
  getBoards: function () {
    const url = "/api/v1/forums/boards";
    return Http.get(url);
  },
  //论坛详情
  getBoard: function (boardId) {
    const url = "/api/v1/forums/board/" + boardId;
    return Http.get(url);
  },
  //版块帖子列表
  getPosts: function (boardId) {
    const url = "/api/v1/forums/board/" + boardId + "/posts";
    return Http.get(url);
  },
  //获取最新帖子列表
  getLatestPosts: function (boardId) {
    const url = "/api/v1/forums/posts/latest";
    return Http.get(url);
  },
  //帖子
  getPost: function (postId) {
    const url = "/api/v1/forums/post/" + postId;
    return Http.get(url);
  },
  //帖子comments
  getPostComments: function (postId, page) {
    const url = "/api/v1/comments/post/" + postId + "/" + page;
    return Http.get(url);
  },
  //提交 comment
  publishComment: function (postId, comment) {
    const url = "/api/v1/user/comments/publish/" + postId;
    return Http.post(url, comment);
  }
}
