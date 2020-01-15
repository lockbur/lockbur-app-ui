<template>
  <div class="el-loading-mask" style="display: block;">
    <div class="el-loading-spinner">
      <div class="text-center text-danger">
        <i class="fa fa-spinner fa-spin fa-3x"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loading"
  }
</script>

<style scoped>
  .el-loading-mask {
    position: absolute;
    z-index: 10000;
    background-color: rgba(255, 255, 255, 0.9);
    width: 100%;
    height: 100%;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    margin: 0px;
  }

  .el-loading-spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    position: absolute;
  }
</style>
