<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <section class="scrollable wrapper">
        <div class="container bg-white-only">
          <div class="row padder-v">
            <div class="col-sm-6">
              <h3 class="m-t-none m-b">用户登录</h3>
              <div v-if="msg.show" class="alert alert-danger animated fadeInUp">
                <button type="button" class="close" data-dismiss="alert">×</button>
                <i class="fa fa-ban-circle"></i><strong>错误信息!</strong>
                <span id="errorPlacement">{{msg.message}}</span>
              </div>
              <form id="inputForm" role="form">
                <div class="form-group">
                  <label>用户名</label>
                  <input v-model="user.username" type="text" class="form-control">
                </div>
                <div class="form-group">
                  <label>密码</label>
                  <input v-model="user.password" type="password" class="form-control">
                </div>
                <div class="form-group">
                  <p><a href="/login.html#/forget" class="text-info">忘记密码</a></p>
                </div>
                <div class="checkbox m-t-lg">
                  <label>
                    <input type="checkbox" checked>记住一个月
                  </label>
                </div>
                <div class="form-group">
                  <button type="button" class="btn btn-info" @click="login">
                    <strong>登 录</strong>
                  </button>
                </div>
              </form>
            </div>
            <div class="col-sm-6">
              <h2>为什么要加入萝卜壁纸?</h2>
              <div style="line-height: 200%; font-size: 14px">
                - 成为中国壁纸数量增长最快的俱乐部!<br>
                - 提供优质的壁纸建议! 上传壁纸,给世界分享你的优秀壁纸作品!<br>
                - <span style="font-weight: bold; color: #D00;">注册成会员比普通用户可以看到更少的广告!</span><br>
                - 当有用户跟您互动或者你壁纸被点赞,接收反馈信息!<br>
                - 归档你的壁纸并分享给你的朋友!<br>
                - 在你上传壁纸和分享壁纸后者评论壁纸你的显示尊贵头像!<br>
                - 可以参与投票,帮助统计最好的壁纸和最受欢迎的壁纸榜单!<br>
              </div>
              <h4>没有账号?</h4>
              <p>点击<a href="/#/register" class="text-info">注册新用户</a></p>
              <p>或者使用第三方账号登录</p>
              <a href="#" class="btn btn-primary">
                <i class="fa fa-pinterest-square pull-left"></i>qq登录
              </a>
              <a href="#" class="btn btn-info">
                <i class="fa fa-weibo pull-left"></i> 微博登录
              </a>
              <a href="#" class="btn btn-danger">
                <i class="fa fa-google-plus pull-left"></i> 百度账号登录
              </a>
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

  import Storage from '@/storage'
  import AccountApi from '@/service/AccountApi'

  export default {
    components: {
      Navbar, Footer
    },
    data () {
      return {
        msg: {
          show: false,
          message: '登录可以获得更好的服务.'
        },
        user: {
          'username': '',
          'password': ''
        }
      }
    },
    methods: {
      login () {
        AccountApi.login(this.user).then((res) => {
          if (res.code === '2004001') {
            const AUTH_TOKEN = res.data.token
            Storage.put('AUTH_TOKEN', AUTH_TOKEN)
            window.location.href = '/#/'
          } else {
            this.msg.show = true
            this.msg.message = res.msg
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
