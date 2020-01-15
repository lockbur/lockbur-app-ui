<template>
  <div class="col-sm-9 bg-white-only">
    <h4 class="m-t-lg m-b">写评论</h4>
    <div class="form-group">
      <textarea class="form-control"
                rows="5"
                v-model="comment.content"
                placeholder="输入评论内容."></textarea>
    </div>
    <div class="form-group">
      <button class="btn btn-success" v-on:click="publishComment">提交评论</button>
    </div>
    <h4 class="m-t-lg m-b">3 个评论</h4>
    <section class="comment-list block">
      <article class="comment-item" v-for="item in comments">
        <a :href="'/#/user/'+item.user.username+'/overview'" class="pull-left thumb-sm">
          <img :src="'//img.wallbase.tv/'+item.user.userpic_url" class="img-circle">
        </a>
        <section class="comment-body m-b">
          <header>
            <a :href="'/#/user/'+item.user.username">
              <strong>{{item.user.username}}</strong>
            </a>
            <span class="text-muted text-xs block m-t-xs">{{item.createTime}}</span>
          </header>
          <div class="m-t-sm">
            {{item.content}}
          </div>
        </section>
      </article>
    </section>
  </div>
</template>

<script>
  import WallpaperApi from '@/service/WallpaperApi'
  import Storage from '@/storage'

  export default {
    props: {
      wallpaperId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        comment: {
          type: "WALLPAPER",
          content: ""
        },
        comments: [],
        page: 1
      }
    },
    mounted: function () {
      this.queryComments();
    },
    methods: {
      queryComments: function () {
        WallpaperApi.getComments(this.wallpaperId, this.page).then((res) => {
          this.comments = res.data.comments;
        }).catch(err => {
          console.log(err);
        })
      },
      publishComment: function () {
        //先判断是否登录 AUTH_TOKEN是否存在
        let AUTH_TOKEN = Storage.get('AUTH_TOKEN');
        if (AUTH_TOKEN) {//已登录
          WallpaperApi.publishComment(this.wallpaperId, this.comment).then((res) => {
            this.comment.content = "";
            this.queryComments();
          }).catch(err => {
            console.log(err);
          })
        } else {
          this.$confirm({
            size: "md",
            title: "系统提示信息",
            content: "您还未登录系统,请点击确认将引导您登录系统."
          }).then(() => {
            this.$router.push({path: '/login'})
          }).catch(() => {
            //cancel
          })
        }
      },
    }
  }
</script>

<style scoped>

</style>
