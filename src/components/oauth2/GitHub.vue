<template>

</template>

<script>
  export default {
    name: "GitHub",
    data() {
      return {
        code: "",
      }
    },
    created: function () {
      this.code = this.$route.query.code;
      console.log(this.code)
    }
  }
</script>

<style scoped>

</style>
