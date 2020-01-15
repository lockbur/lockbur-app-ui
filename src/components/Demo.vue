<template>
  <div>
    <div class="container">
      <span>{{msg.message}}</span>
      <button class="btn btn-default" @click="open">toast</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Demo",
    data() {
      return {
        msg: {
          show: false,
          message: "输入你注册时的邮箱，重置你的密码."
        }
      }
    },
    methods: {
      open: function () {
        this.$Toast
        //$('.modal-dialog').modal()
      }
    }
  }
</script>

<style scoped>

</style>
