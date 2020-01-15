<template>
  <div class="app wrapper">
    <section class="hbox bg-white-only stretch r-t">
      <aside class="aside-lg wrapper">
        <section class="panel panel-default">
          <header class="panel-heading">
            <i class="fa fa-fw fa-cogs"></i> 设置
          </header>
          <div class="list-group">
            <a href="/#/settings/about" class="list-group-item">
              <i class="fa fa-fw fa-desktop"></i> 基本设置
            </a>
            <a href="/#/settings/profile" class="list-group-item">
              <i class="fa fa-fw fa-globe"></i> 个人资料
            </a>
            <a href="/#/settings/account" class="list-group-item">
              <i class="fa fa-user fa-fw"></i> 账户设置
            </a>
            <a href="/#/settings/browsing" class="list-group-item">
              <i class="fa fa-fw fa-th"></i> 浏览设置
            </a>
            <a href="/#/settings/oauth2" class="list-group-item">
              <i class="fa fa-fw fa-sitemap"></i> 第三方账号绑定
            </a>
            <a href="/#/settings/password" class="list-group-item">
              <i class="fa fa-fw fa-lock"></i> 修改密码
            </a>
            <a href="/#/settings/danger" class="list-group-item">
              <i class="fa fa-fw fa-bell"></i> 危险操作
            </a>
          </div>
        </section>
      </aside>
      <section class="wrapper">
        <router-view></router-view>
      </section>
    </section>
  </div>
</template>
<script>

  export default {
    data() {
      return {}
    },
    components: {},
    methods: {}
  }
</script>
