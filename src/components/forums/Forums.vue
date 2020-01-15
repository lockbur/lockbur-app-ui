<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <section class="scrollable wrapper-lg">
        <div class="row">
          <div class="col-sm-9">
            <div class="blog-post">
              <template v-for="board in boards">
                <div class="post-item">
                  <div class="caption wrapper">
                    <h3 class="post-title">
                      <router-link :to="'/forums/boards/'+board.id" class="text-info">
                        {{board.name}}
                      </router-link>
                    </h3>
                    <div class="post-sum">
                      {{board.description}}
                    </div>
                    <div class="line"></div>
                    <div class="text-muted">
                      <i class="fa fa-clock-o icon-muted"></i>
                      <small>{{board.createTime}}</small>
                      <i class="fa fa-comment-o icon-muted"></i>
                      <small>共{{board.posts}}帖子</small>
                    </div>
                  </div>
                </div>
              </template>
              <template v-for="board in boards">
                <div class="post-item">
                  <div class="caption wrapper">
                    <h3 class="post-title">
                      <router-link :to="'/forums/boards/'+board.id" class="text-info">
                        {{board.name}}
                      </router-link>
                    </h3>
                    <div class="post-sum">
                      {{board.description}}
                    </div>
                    <div class="line"></div>
                    <div class="text-muted">
                      <i class="fa fa-clock-o icon-muted"></i>
                      <small>
                        <timeago :datetime="board.createTime" locale="zh-CN"></timeago>
                      </small>
                      <i class="fa fa-comment-o icon-muted"></i>
                      <small>共{{board.posts}}帖子</small>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="panel">
              <h4 class="font-thin padder">最新活跃用户</h4>
              <ul class="list-group alt">
                <li class="list-group-item">
                  <div class="media">
                    <span class="pull-left thumb-sm"><img src="/static/images/avatars.jpg" alt="John said"
                                                          class="img-circle"></span>
                    <div class="pull-right text-success m-t-sm">
                      <i class="fa fa-circle"></i>
                    </div>
                    <div class="media-body">
                      <div><a href="#">Chris Fox</a></div>
                      <small class="text-muted">about 2 minutes ago</small>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="media">
                    <span class="pull-left thumb-sm"><img src="/static/images/avatars.jpg" alt="John said"
                                                          class="img-circle"></span>
                    <div class="pull-right text-muted m-t-sm">
                      <i class="fa fa-circle"></i>
                    </div>
                    <div class="media-body">
                      <div><a href="#">Amanda Conlan</a></div>
                      <small class="text-muted">about 2 hours ago</small>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="media">
                    <span class="pull-left thumb-sm"><img src="/static/images/avatars.jpg" alt="John said"
                                                          class="img-circle"></span>
                    <div class="pull-right text-warning m-t-sm">
                      <i class="fa fa-circle"></i>
                    </div>
                    <div class="media-body">
                      <div><a href="#">Dan Doorack</a></div>
                      <small class="text-muted">3 days ago</small>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="media">
                    <span class="pull-left thumb-sm"><img src="/static/images/avatars.jpg" alt="John said"
                                                          class="img-circle"></span>
                    <div class="pull-right text-danger m-t-sm">
                      <i class="fa fa-circle"></i>
                    </div>
                    <div class="media-body">
                      <div><a href="#">Lauren Taylor</a></div>
                      <small class="text-muted">about 2 minutes ago</small>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="panel">
              <h4 class="font-thin padder">最新的话题</h4>
              <ul class="list-group">
                <template v-for="(post ,idx) in posts">
                  <li class="list-group-item">
                    <a href="/#/user/wangkun23/overview" title="wangkun23" class="pull-left thumb-sm m-r">
                      <img :src="'/static/images/m'+ idx % 6 +'.jpg'" class="img-thumbnail">
                    </a>
                    <router-link :to="'/forums/post/'+post.id" :title="post.title" target="_blank">
                      <p class="block text-sm text-ellipsis">{{post.title}}</p>
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
  import Navbar from '@/components/commons/Navbar'
  import Footer from '@/components/commons/Footer'

  import ForumsApi from '@/service/ForumsApi'

  export default {
    data() {
      return {
        boards: [],
        posts: []
      }
    },
    components: {
      Navbar, Footer
    },
    created: function () {
      this.query()
      this.getLatestPosts()
    },
    methods: {
      query: function () {
        ForumsApi.getBoards().then((res) => {
          this.boards = res.data
        }).catch(err => {
          console.log(err);
        })
      },
      getLatestPosts: function () {
        ForumsApi.getLatestPosts().then((res) => {
          this.posts = res.data
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
