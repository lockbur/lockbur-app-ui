<template>
  <div class="wrapper">
    <section class="bg-white-opacity wrapper r-t r-2x">
      <div class="row">
        <div class="col-lg-2">
          <div class="text-center">
            <a href="#" class="thumb-lg">
              <img :src="'//img.wallbase.tv/'+user.avatar" v-if="user.avatar!=undefined" class="img-circle">
            </a>
            <h3>{{user.username}}</h3>
            <div class="btn-group">
              <a class="btn btn-default" data-toggle="button" v-on:click="follow">
                <span class="text"><i class="fa fa-eye"></i> 关注</span>
                <span class="text-active"><i class="fa fa-eye"></i> 取消关注</span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-10">
          <div>
            <strong class="text-uc text-lg text-white">个人简介</strong>
            <p class="text-white">
              {{userInfo.description}}
            </p>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-light lt">
      <ul class="nav nav-tabs nav-white">
        <router-link tag="li" :to="'/user/'+user.username+'/overview'" active-class="active">
          <a class="text-center">
            <span class="m-b-xs h4 block">
                <span class="badge">{{userInfo.profileViews}}</span>
            </span>
            <small class="text-muted">概览</small>
          </a>
        </router-link>
        <router-link tag="li" :to="'/user/'+user.username+'/uploads'" active-class="active">
          <a class="text-center">
            <span class="m-b-xs h4 block">
                <span class="badge">{{userInfo.uploads}}</span>
            </span>
            <small class="text-muted">上传</small>
          </a>
        </router-link>
        <router-link tag="li" :to="'/user/'+user.username+'/favorite'" active-class="active">
          <a class="text-center">
            <span class="m-b-xs h4 block">
                <span class="badge">{{userInfo.favorites}}</span>
            </span>
            <small class="text-muted">收藏</small>
          </a>
        </router-link>
        <router-link tag="li" :to="'/user/'+user.username+'/stars'" active-class="active">
          <a class="text-center">
            <span class="m-b-xs h4 block">
                <span class="badge">{{userInfo.stars}}</span>
            </span>
            <small class="text-muted">喜欢</small>
          </a>
        </router-link>
        <router-link tag="li" :to="'/user/'+user.username+'/followers'" active-class="active">
          <a class="text-center">
            <span class="m-b-xs h4 block">
                <span class="badge">{{userInfo.followers}}</span>
            </span>
            <small class="text-muted">关注</small>
          </a>
        </router-link>
        <router-link tag="li" :to="'/user/'+user.username+'/following'" active-class="active">
          <a class="text-center">
            <span class="m-b-xs h4 block">
                <span class="badge">{{userInfo.followings}}</span>
            </span>
            <small class="text-muted">粉丝</small>
          </a>
        </router-link>
      </ul>
    </section>
    <div class="bg-white-only">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

  import UserApi from '@/service/UserApi'

  export default {
    data() {
      return {
        username: "",
        user: {
          bio: "When I was young and free and my imagination had no limits,I dreamed of changing the\n" +
          "            world.\n" +
          "            As I grew older and wiser, I discovered the world would not change, so I shortened my\n" +
          "            sights somewhat and decided to change only my country. But it, too, seemed immovable.\n" +
          "            As I grew into my twilight years, in one last desperate attempt, I settled for changing\n" +
          "            only my family, those closest to me, but alas, they would have none of it.\n" +
          "            And now, as I lie on my death bed, I suddenly realize:\n" +
          "            If I had only changed myself first, then by example I would have changed my family.From\n" +
          "            their in spiration and encouragement, I would then have been able to better my country,\n" +
          "            and who knows, I may have even changed the world."
        },
        userInfo: {
          profileViews: 0,
          uploads: 0,
          favorites: 0,
          stars: 0,
          followers: 0,
          followings: 0
        }
      }
    },
    mounted: function () {
    },
    created: function () {
      this.username = this.$route.params.username;
      this.query();
    },
    methods: {
      query: function () {
        UserApi.getUserInfo(this.username).then((res) => {
          this.user = res.data.user;
          this.userInfo = res.data.userInfo;
        }).catch(err => {
          console.log(err);
        })
      },
      follow: function () {
        UserApi.follow(this.username).then((res) => {

        }).catch(err => {
          console.log(err);
        })
      },
      unFollow: function () {
        UserApi.unFollow(this.username).then((res) => {

        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
