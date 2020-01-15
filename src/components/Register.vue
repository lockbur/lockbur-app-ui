<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <section class="scrollable wrapper">
        <div class="container aside-xxl">
          <section class="panel panel-default ">
            <div class="panel-body">
              <h3 class="m-t-none m-b">新用户注册</h3>
              <div class="alert alert-danger animated fadeInUp" v-if="msg.show">
                <i class="fa fa-ban-circle"></i><strong>错误信息!</strong>
                <span id="errorPlacement">{{msg.message}}</span>
              </div>
              <form role="form">
                <div class="form-group">
                  <label>用户名</label>
                  <input type="text" class="form-control" v-model="user.username">
                </div>
                <div class="form-group">
                  <label>电子邮件</label>
                  <input type="email" class="form-control" v-model="user.email">
                </div>
                <div class="form-group">
                  <label>密码</label>
                  <input type="password" class="form-control" v-model="user.password">
                </div>
                <div class="form-group">
                  <label>重复密码</label>
                  <input type="password" class="form-control" v-model="user.confirmPassword">
                </div>
                <div class="checkbox m-t-lg">
                  <label>
                    <input type="checkbox" name="rememberme" checked data-required="true">同意注册协议
                  </label>
                </div>
                <div class="form-group">
                  <button type="button" class="btn btn-info btn-block" v-on:click="register">
                    <strong>注 册</strong>
                  </button>
                </div>
              </form>
            </div>
          </section>
          <section class="panel panel-default ">
            <div class="panel-body">
              <h4>如果已有账号?</h4>
              <p>点击<a href="/#/login" class="text-info">登录</a></p>
              <p>或者使用第三方账号登录</p>
              <a href="#" class="btn btn-primary btn-block m-b-sm">
                <i class="fa fa-pinterest-square pull-left"></i>qq登录
              </a>
              <a href="#" class="btn btn-info btn-block m-b-sm">
                <i class="fa fa-weibo pull-left"></i> 微博登录
              </a>
              <a href="#" class="btn btn-danger btn-block">
                <i class="fa fa-google-plus pull-left"></i> 百度账号登录
              </a>
            </div>
          </section>
        </div>
      </section>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Navbar from '@/components/commons/Navbar'
  import Footer from '@/components/commons/Footer'

  import Storage from '@/storage'
  import AccountApi from '@/service/AccountApi'

  export default {
    data() {
      return {
        msg: {
          show: false,
          message: "登录可以获得更好的服务."
        },
        user: {
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        }
      }
    },
    components: {
      Navbar, Footer
    },
    methods: {
      register: function () {
        AccountApi.register(this.user).then((res) => {
          if (res.code == "2004000") {
            let AUTH_TOKEN = res.data.token
            Storage.put('AUTH_TOKEN', AUTH_TOKEN)
            //TODO.. 添加一根引导页面
            window.location.href = "/#/"
          } else {
            this.msg.show = true;
            this.msg.message = res.msg;
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
