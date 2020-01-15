<template>
  <section class="scrollable wrapper">
    <div class="container aside-xxl">
      <section class="panel panel-default ">
        <div class="panel-body">
          <h3 class="m-t-none m-b">重置你的密码</h3>
          <div class="alert alert-danger animated fadeInUp" v-if="msg.show">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <i class="fa fa-ban-circle"></i><strong>提示信息!</strong>
            <span id="errorPlacement">{{msg.message}}</span>
          </div>
          <form role="form" id="inputForm">
            <div class="form-group">
              <label>密码</label>
              <input type="password" class="form-control" v-model="account.password">
            </div>
            <div class="form-group">
              <label>重复密码</label>
              <input type="password" class="form-control" v-model="account.confirmPassword">
            </div>
            <div class="form-group">
              <button type="button"
                      class="btn btn-block btn-info"
                      v-on:click="reset">
                <strong>确 定</strong>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
  import Navbar from '@/components/commons/Navbar'
  import Footer from '@/components/commons/Footer'

  import AccountApi from '@/service/AccountApi'

  export default {
    data() {
      return {
        msg: {
          show: false,
          message: "输入你注册时的邮箱，重置你的密码."
        },
        account: {
          username: "",
          password: "",
          confirmPassword: "",
          code: ""
        }
      }
    },
    components: {
      Navbar, Footer
    },
    created: function () {
      this.account.username = this.$route.query.username;
      this.account.code = this.$route.query.code;
      console.log(this.account.username);
      console.log(this.account.code);
    },
    methods: {
      reset: function () {
        AccountApi.reset(this.account).then((res) => {
          this.msg.show = true;
          this.msg.message = res.msg;
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
