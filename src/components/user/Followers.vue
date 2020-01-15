<template>
  <section class="panel panel-default">
    <div class="panel-body">
      <h3 class="m-t-none m-b">关注我的人</h3>
      <ul class="list-group no-radius list-group-lg no-border">
        <li class="list-group-item" v-for="item in followers">
          <a :href="'/#/user/'+item.username+'/overview'" class="thumb pull-left m-r-sm">
            <img :src="'//img.wallbase.tv/'+item.avatar" class="r-2x">
          </a>
          <a href="#" class="clear">
            <small class="pull-right">
            </small>
          </a>
          <small class="pull-right">
            <a href="#" class="btn btn-default">关注</a>
          </small>
          <strong class="block m-b-sm">
            <a :href="'/#/user/'+item.username+'/overview'">{{item.username}}</a>
            <small class="block">{{item.description}}</small>
          </strong>
          <small class="text-muted">
            <i class="fa fa-clock-o icon-muted"></i> {{item.createTime}}
          </small>
        </li>
      </ul>
      <Page :page="page" :totals="totalPages" :callback="callback"></Page>
    </div>
  </section>
</template>
<script>
  import Page from '@/components/utils/VuePage'
  import UsersApi from '@/service/UsersApi'

  export default {
    data() {
      return {
        username: "",
        followers: [],
        page: 1,
        totalPages: 0
      }
    },
    components: {
      Page
    },
    created: function () {
      this.username = this.$route.params.username;
      this.loadMore();
    },
    methods: {
      loadMore: function () {
        UsersApi.getUserFollowers(this.username, this.page).then((res) => {
          this.followers = res.data.content;
          this.totalPages = res.data.totalPages;
        }).catch(err => {
          console.log(err);
        })
      },
      callback(page) {
        this.page = page;
        this.loadMore();
      }
    }
  }
</script>
