<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <section class="scrollable wrapper-lg">
        <div class="row">
          <div class="col-sm-9">
            <div class="blog-post">
              <div class="post-item">
                <div class="caption wrapper-lg">
                  <h3 class="post-title">{{post.title}}</h3>
                  <div class="post-sum">
                    <p v-html="post.content"></p>
                  </div>
                  <div class="line line-lg"></div>
                  <div class="text-muted">
                    <i class="fa fa-user icon-muted"></i>
                    <a href="#" class="m-r-sm">Admin</a>
                    <i class="fa fa-clock-o icon-muted"></i>
                    <timeago :datetime="post.createTime" locale="zh-CN"></timeago>
                    <span class="m-l-sm">
                      <i class="fa fa-eraser icon-muted"></i> {{post.views}} 次浏览
                    </span>
                    <span class="m-l-sm">
                    <i class="fa fa-comment-o icon-muted"></i> {{post.replays}} 回复
                  </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel">
              <div class="panel-heading"> {{post.replays}} 个回复</div>
              <div class="panel-body">
                <section class="comment-list">
                  <template v-for="comment in comments">
                    <article class="comment-item">
                      <a :href="'/#/user/'+comment.user.username+'/overview'" class="pull-left thumb-sm avatar">
                        <img src="/static/images/avatars.jpg" class="img-circle">
                      </a>
                      <span class="arrow left"></span>
                      <section class="comment-body panel panel-default">
                        <header class="panel-heading">
                          <a :href="'/#/user/'+comment.user.username+'/overview'" class="text-info">
                            {{comment.user.username}}
                          </a>
                          <span class="text-muted m-l-sm pull-right">
                            <i class="fa fa-clock-o"></i> {{comment.createTime}}
                          </span>
                        </header>
                        <div class="panel-body">
                          <div v-html="comment.content" class=""></div>
                        </div>
                        <div class="panel-footer">
                          <div class="comment-action">
                            <a href="#" class="btn btn-default btn-sm">
                              <i class="fa fa-thumbs-o-up text-muted text"></i>
                              <!--<i class="fa fa-thumbs-o-up text-danger text-active"></i>-->
                              支持
                            </a>
                            <a href="#comment-form" class="btn btn-default btn-sm">
                              <i class="fa fa-thumbs-o-down text-muted"></i> 反对
                            </a>
                          </div>
                        </div>
                      </section>
                    </article>
                  </template>
                  <!-- / .comment-reply -->
                  <article class="comment-item">
                    <a class="pull-left thumb-sm avatar">
                      <img src="/static/images/avatars.jpg">
                    </a>
                    <span class="arrow left"></span>
                    <section class="comment-body panel panel-default">
                      <header class="panel-heading">
                        <i class="fa fa-edit text-md"></i> 发表评论
                      </header>
                      <div class="panel-body">
                        <vue-editor v-model="comment.content"></vue-editor>
                      </div>
                      <div class="panel-footer">
                        <button class="btn btn-default" @click="publishComment">提交评论</button>
                      </div>
                    </section>
                  </article>
                </section>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="panel">
              <div class="panel-body">
                <a href="#" class="thumb pull-left m-r">
                  <img src="static/images/avatars.jpg" class="img-circle">
                </a>
                <div class="clear">
                  <a href="#" class="text-info">@wangkun <i class="fa fa-twitter"></i></a>
                  <small class="block text-muted">2,415 粉丝 / 225 关注</small>
                  <a href="#" class="btn btn-xs btn-success m-t-xs">关注</a>
                </div>
              </div>
            </div>
            <div class="panel">
              <h4 class="font-thin padder">最新的话题</h4>
              <ul class="list-group">
                <template v-for="(post ,idx) in posts">
                  <li class="list-group-item">
                    <a href="/#/user/wangkun23/overview" title="wangkun23" class="pull-left thumb-sm m-r">
                      <img :src="'/static/images/m'+ idx % 6 +'.jpg'" class="img-thumbnail">
                    </a>
                    <router-link :to="'/forums/post/'+post.id" :title="post.title" target="_blank" class="block">
                      <p class="block text-sm text-ellipsis">{{ post.title }}</p>
                    </router-link>
                    <small class="block text-muted">
                      <i class="fa fa-clock-o"></i>
                      <timeago :datetime="post.createTime" locale="zh-CN"/>
                    </small>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import {VueEditor} from "vue2-editor";

  import Navbar from '@/components/commons/Navbar'
  import Footer from '@/components/commons/Footer'

  import ForumsApi from '@/service/ForumsApi'

  export default {
    data() {
      return {
        postId: "",
        post: {},
        comments: [],
        page: 1,
        comment: {
          type: "POST",
          markdown: "",
          content: ""
        },
        posts: []
      }
    },
    components: {
      Navbar, Footer, VueEditor
    },
    created: function () {
      this.postId = this.$route.params.id;
      this.query();
      this.queryComments()
      this.getLatestPosts()
    },
    methods: {
      change: function (value, render) {
        this.comment.markdown = value
        this.comment.content = render
      },
      query: function () {
        ForumsApi.getPost(this.postId).then((res) => {
          this.post = res.data;
        }).catch(err => {
          console.log(err)
        })
      },
      getLatestPosts: function () {
        ForumsApi.getLatestPosts().then((res) => {
          this.posts = res.data
        }).catch(err => {
          console.log(err);
        })
      },
      queryComments: function () {
        ForumsApi.getPostComments(this.postId, this.page).then((res) => {
          this.comments = res.data.comments;
          this.page++;
        }).catch(err => {
          console.log(err);
        })
      },
      publishComment: function () {
        ForumsApi.publishComment(this.postId, this.comment).then((res) => {
          this.comment.markdown = "";
          this.comment.content = "";
          //追加到列表之前
          this.page = 1;
          this.queryComments();
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
