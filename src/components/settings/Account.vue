<template>
  <section class="panel panel-default">
    <header class="panel-heading">基本设置</header>
    <div class="panel-body">
      <form role="form">
        <div class="form-group">
          <label>用户名</label>
          <input class="form-control" v-model="user.username">
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input class="form-control" v-model="user.email">
        </div>
        <button class="btn btn-default" v-on:click="update()">
          <i class="fa fa-save fa-fw"></i> 保存
        </button>
      </form>
    </div>
  </section>
</template>
<script>
  import UserApi from '@/service/UserApi'

  export default {
    data() {
      return {
        user: {
          "username": "",
          "email": ""
        }
      }
    },
    mounted: function () {
    },
    created: function () {
      this.query();
    },
    methods: {
      query: function () {
        UserApi.getAccount().then((res) => {
          this.user = res.data.user;
        }).catch(err => {
          console.log(err);
        })
      },
      update: function () {
        UserApi.updateAccount(this.user).then((res) => {

        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
