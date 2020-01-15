<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <section class="scrollable wrapper-lg">
        <div class="row">
          <div class="col-xs-12">
            <ul class="breadcrumb">
              <li><a href="/"><i class="fa fa-home"></i> 首页</a></li>
              <li><a href="/#/forums">动态</a></li>
              <li class="active">{{board.name}}</li>
            </ul>
          </div>
          <div class="col-xs-12 col-md-9">
            <div class="panel">
              <header class="panel-heading">资讯列表</header>
              <div class="panel-body">
                <ul class="list-group">
                  <template v-for="(post ,idx) in posts">
                    <li class="list-group-item">
                    <span class="pull-left thumb-sm m-r">
                      <img :src="'/static/images/m'+ idx % 6 +'.jpg'" class="img-thumbnail">
                    </span>
                      <router-link :to="'/forums/post/'+post.id" :title="post.title" class="block">
                        <p class="block text-sm text-ellipsis">{{post.title}}</p>
                      </router-link>
                      <div class="text-muted">
                        <small class="text-muted">by wangkun23</small>
                        <small class="text-muted">
                          <i class="fa fa-clock-o icon-muted"></i>
                          <timeago :datetime="post.createTime" locale="zh-CN"></timeago>
                        </small>
                        <a href="#" class="text-muted m-l-sm">
                          <i class="fa fa-comment-o icon-muted"></i> {{post.replays}} 个评论
                        </a>
                      </div>
                    </li>
                  </template>
                </ul>
                <Page :page="page" :totals="totalPages" :callback="callback"></Page>
              </div>
            </div>
          </div>
          <div class="col-md-3 hidden-xs">
            <div class="panel">
              <div class="panel-body">
                <router-link :to="'/forums/boards/'+boardId+'/post/new'" target="_blank"
                             class="btn btn-success btn-block">
                  <i class="fa fa-plus-circle"></i> 我要发帖
                </router-link>
              </div>
            </div>
            <div class="panel">
              <header class="panel-heading">热门标签</header>
              <div class="panel-body">
                <div class="tags m-b-lg l-h-2x">
                  <a href="#" class="label bg-info">Bootstrap</a>
                  <a href="#" class="label bg-info">Application</a>
                  <a href="#" class="label bg-info">Apple</a>
                  <a href="#" class="label bg-info">Less</a>
                  <a href="#" class="label bg-info">Theme</a>
                  <a href="#" class="label bg-info">Wordpress</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Navbar from '@/components/commons/Navbar'
  import Footer from '@/components/commons/Footer'
  import Page from '@/components/utils/VuePage'
  import ForumsApi from '@/service/ForumsApi'

  export default {
    data() {
      return {
        boardId: "",
        board: {},
        posts: [],
        page: 1,
        totalPages: 0
      }
    },
    components: {
      Navbar, Footer, Page
    },
    created: function () {
      this.boardId = this.$route.params.boardId;
      this.query();
    },
    methods: {
      query: function () {
        ForumsApi.getBoard(this.boardId).then((res) => {
          this.board = res.data;
          //继续查询post的列表信息
          this.queryPosts();
        }).catch(err => {
          console.log(err);
        })
      },
      queryPosts: function () {
        ForumsApi.getPosts(this.boardId).then((res) => {
          this.posts = res.data.content;
          this.totalPages = res.data.totalPages;
        }).catch(err => {
          console.log(err);
        })
      },
      callback(page) {
      }
    }
  }
</script>
