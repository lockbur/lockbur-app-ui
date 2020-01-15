<template>
  <section class="panel panel-default">
    <header class="panel-heading">基本设置</header>
    <div class="panel-body">
      <form role="form">
        <div class="form-group">
          <label>姓名</label>
          <input class="form-control" v-model="userInfo.realname">
        </div>
        <div class="form-group">
          <label>联系地址</label>
          <input class="form-control" v-model="userInfo.address">
        </div>
        <div class="form-group">
          <label>生日</label>
          <input class="form-control" v-model="userInfo.birthday">
        </div>
        <div class="form-group">
          <label>公司</label>
          <input class="form-control" v-model="userInfo.company">
        </div>
        <div class="form-group">
          <label>性别</label>
          <select class="form-control" v-model="userInfo.gender">
            <option>保密</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <div class="form-group">
          <label>qq</label>
          <input class="form-control" v-model="userInfo.qq">
        </div>
        <div class="form-group">
          <label>个人网站</label>
          <input class="form-control" v-model="userInfo.site">
        </div>
        <div class="form-group">
          <label>skype</label>
          <input class="form-control" v-model="userInfo.skype">
        </div>
        <div class="form-group">
          <label>yahoo</label>
          <input class="form-control" v-model="userInfo.yahoo">
        </div>
        <button class="btn btn-default" v-on:click="updateProfile()">
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
        userInfo: {
          "address": "",
          "birthday": "",
          "company": "",
          "gender": "",
          "qq": "",
          "realname": "",
          "site": "",
          "skype": "",
          "yahoo": ""
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
        UserApi.getProfile().then((res) => {
          this.userInfo = res.data.userInfo;
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
