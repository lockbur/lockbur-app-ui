<template>
  <nav id="header" class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button"
                class="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">导航隐藏</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">
          <img src="/static/images/logo.png"/>
          <strong class="text-white">Wallbase.tv</strong>
        </a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <div class="navbar-right ">
          <ul class="nav navbar-nav nav-user user" v-if="login">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle bg clear" data-toggle="dropdown">
                <span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                    <img src="/static/images/user.jpg">
                </span>
                <span>{{user.username}}</span>
                <b class="caret"></b>
              </a>
              <ul class="dropdown-menu animated fadeInRight">
                <span class="arrow top"></span>
                <router-link tag="li" :to="'/user/'+user.username+'/overview'">
                  <a>个人资料</a>
                </router-link>
                <router-link tag="li" :to="'/user/'+user.username+'/favorite'">
                  <a>我的收藏</a>
                </router-link>
                <router-link tag="li" to="/settings/about">
                  <a>设置</a>
                </router-link>
                <li class="divider"></li>
                <li>
                  <a href="#" v-on:click="logout()">注销登录</a>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav" v-if="!login">
            <li>
              <a href="/#/login">
                <i class="fa fa-user"></i> 登录
              </a>
            </li>
            <li>
              <a href="/#/register">
                <i class="icon-user-follow"></i> 注册
              </a>
            </li>
          </ul>
        </div>
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/discover" active-class="active">
            <a class="discover">
              <i class="icon icon-disc"></i>
              <span> 发现</span>
            </a>
          </router-link>
          <router-link tag="li" to="/latest" active-class="active">
            <a class="latest">
              <i class="fa fa-lg fa-clock-o"></i>
              <span> 最新</span>
            </a>
          </router-link>
          <router-link tag="li" to="/random" active-class="active">
            <a class="random">
              <i class="fa fa-lg fa-random"></i>
              <span> 随机</span>
            </a>
          </router-link>
          <router-link tag="li" to="/forums" active-class="active">
            <a>
              <i class="fa fa-trophy"></i>
              <span> 动态</span>
            </a>
          </router-link>
          <router-link tag="li" to="/more" active-class="active">
            <a class="more">
              <i class="icon icon-equalizer"></i>
              <span> 更多</span>
            </a>
          </router-link>
          <router-link tag="li" to="/search" active-class="active">
            <a class="search">
              <i class="fa fa-lg fa-search"></i>
              <span> 搜索</span>
            </a>
          </router-link>
        </ul>
      </div><!--/.navbar-collapse -->
    </div>
  </nav>
</template>
<script>
  import Storage from '@/storage'
  import UserApi from '@/service/UserApi'

  export default {
    data() {
      return {
        login: false,
        user: {
          username: "wangkun23"
        }
      }
    },
    created: function () {
      this.getCurrentUser();
    },
    methods: {
      getCurrentUser() {
        UserApi.getAccount().then((res) => {
          if (res.code == "2000000") {
            this.login = true;
            this.user = res.data.user;
          } else {
            this.login = false;
            this.user = {};
          }
        }).catch(err => {
          console.log(err);
        })
      },
      logout() {
        Storage.removeAll();
        this.login = false;
        this.user = {};
        window.location.href = "/#/"
      }
    }
  }
</script>
