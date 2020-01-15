<template>
  <section class="panel panel-default">
    <header class="panel-heading">基本设置</header>
    <div class="panel-body">
      <form role="form">
        <div class="form-group">
          <label>个性名言</label>
          <textarea class="form-control"
                    v-model="userInfo.description"
                    rows="5"></textarea>
        </div>
        <button class="btn btn-default" v-on:click="updateProfile()">
          <i class="fa fa-save fa-fw"></i> 保存
        </button>
      </form>
      <template v-for="item in comments">
        <article class="media">
          <span class="pull-left thumb-sm">
            <img :src="'//img.wallbase.tv/'+item.user.avatar" class="img-circle">
          </span>
          <div class="media-body">
            <div class="pull-right media-xs text-center text-muted">
              <small class="small">{{item.createTime}}</small>
            </div>
            <small class="block">
              <a href="#" class="">{{item.user.username}}</a>
            </small>
            <small class="block m-t-sm">{{item.content}}</small>
          </div>
        </article>
        <div class="line pull-in"></div>
      </template>
    </div>
  </section>
</template>
<script>
  import UserApi from '@/service/UserApi'

  export default {
    data() {
      return {
        userInfo: {
          description: ""
        },
        comments: []
      }
    },
    components: {},
    mounted: function () {
    },
    created: function () {
      this.query();
      this.queryComments();
    },
    methods: {
      query: function () {
        UserApi.getProfile().then((res) => {
          this.userInfo = res.data.userInfo;
        }).catch(err => {
          console.log(err);
        })
      },
      queryComments: function () {
        UserApi.getUserComments().then((res) => {
          this.comments = res.data.comments;
        }).catch(err => {
          console.log(err);
        })
      },
      updateProfile: function () {
        UserApi.updateProfile(this.userInfo).then((res) => {

        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
