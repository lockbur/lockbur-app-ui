<template>
  <section class="panel panel-default">
    <header class="panel-heading">修改密码</header>
    <div class="panel-body">
      <form role="form">
        <div class="form-group">
          <label>密码</label>
          <input class="form-control">
        </div>
        <div class="form-group">
          <label>重复密码</label>
          <input class="form-control">
        </div>
        <div class="form-group">
          <label>旧密码</label>
          <input class="form-control">
        </div>
        <button class="btn btn-default" v-on:click="update()">
          <i class="fa fa-save fa-fw"></i> 保存
        </button>
      </form>
    </div>
  </section>
</template>
<script>

  export default {
    data() {
      return {
        user: {
          "password": "",
          "confirmPassword": "",
          "oldPassword": ""
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

      },
      update: function () {

      }
    }
  }
</script>
