<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <section class="scrollable wrapper">
        <div class="container aside-xxl">
          <section class="panel panel-default ">
            <div class="panel-body">
              <h3 class="m-t-none m-b">用户名或者邮箱</h3>
              <div class="alert alert-danger animated fadeInUp" v-if="msg.show">
                <button type="button" class="close" data-dismiss="alert">×</button>
                <i class="fa fa-ban-circle"></i><strong>提示信息!</strong>
                <span id="errorPlacement">{{msg.message}}</span>
              </div>
              <form role="form" id="inputForm">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="account.loginName">
                </div>
                <div class="form-group">
                  <button type="button"
                          class="btn btn-block btn-info"
                          v-on:click="forget()">
                    <strong>确  定</strong>
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import AccountApi from '@/service/AccountApi'

  export default {
    data() {
      return {
        msg: {
          show: false,
          message: "输入你注册时的邮箱，重置你的密码."
        },
        account: {
          'loginName': '',
        }
      }
    },
    methods: {
      forget: function () {
        AccountApi.forget(this.account).then((res) => {
          this.msg.show = true;
          this.msg.message = res.msg;
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
