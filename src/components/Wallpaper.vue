<template>
  <div>
    <Navbar></Navbar>
    <section class="container-fluid">
      <section class="scrollable wrapper ">
        <div class="thumbnail bg-black dker">
          <a class="pan" :data-big="'//img.wallbase.tv/'+wallpaper.thumbUrl">
            <img v-if="wallpaper.thumbUrl!=undefined"
                 :src="'//img.wallbase.tv/'+wallpaper.thumbUrl+'?x-oss-process=image/resize,h_500'"/>
          </a>
        </div>
        <div class="panel">
          <div class="panel-body">
            <div class="pull-left">
              <a href="#" class="thumb pull-left m-r">
                <img src="/static/images/avatars.jpg" class="img-circle">
              </a>
              <div class="clear">
                <a :href="'/#/user/'+wallpaper.user.username+'/overview'" class="text-info">wangkun23</a>
                <strong class="block text-muted">World / Architecture</strong>
              </div>
            </div>
            <div class="pull-right text-center m-r">
              <div class="col-xs-4">
                <span class="m-b-xs h4 block">4.3K</span>
                <small class="text-muted">阅览数</small>
              </div>
              <div class="col-xs-4">
                <span class="m-b-xs h4 block">1.9K</span>
                <small class="text-muted">下载数</small>
              </div>
              <div class="col-xs-4">
                <span class="m-b-xs h4 block">1M</span>
                <small class="text-muted">收藏数</small>
              </div>
            </div>
          </div>
        </div>
        <Comments :wallpaperId="wallpaperId"></Comments>

        <div class="col-sm-3">
          <ul class="list-group no-radius m-b-none m-t-n-xxs list-group-lg no-border">
            <li class="list-group-item">
              <template>
                <a class="btn btn-danger" v-if="stared">
                  <i class="fa fa-heart text"></i>
                </a>
                <a class="btn btn-default" v-on:click="addStar" v-else>
                  <i class="fa fa-spin fa-spinner show inline" v-if="starLoading"></i>
                  <i class="fa fa-heart-o text" v-if="!starLoading"></i>
                </a>
              </template>
              <!--<a class="btn btn-default" v-on:click="addFavorite">-->
              <a class="btn btn-default" v-on:click="openCollectionModal">
                <i class="fa fa-plus-circle text"></i> 添加到收藏夹
              </a>
              <AddFavorite :show="showModal" :wallpaperId="wallpaperId" :callback="closeCollectionModal"></AddFavorite>
            </li>
            <li class="list-group-item">
              <div class="btn-group">
                <button class="btn btn-success dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-arrow-down"></i> 免费下载 <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a :href="'//img.wallbase.tv/'+wallpaper.thumbUrl" download>
                      高清壁纸(像素高)
                    </a>
                  </li>
                  <li>
                    <a :href="'//img.wallbase.tv/'+wallpaper.thumbUrl+'?x-oss-process=image/resize,h_500'" download>
                      缩略图(像素低)
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li class="list-group-item">
              <div class="m-b-lg l-h-2x">
                <h4 class="m-b">壁纸标签</h4>
                <template v-for="tag in wallpaper.tags">
                  <a href="#" class="label label-info">
                    {{tag.name}}
                  </a>&nbsp;
                </template>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </section>
    <Footer></Footer>
  </div>
</template>
<script>
  import '@/assets/plugins/pan/jquery.pan.css'
  import '@/assets/plugins/pan/jquery.pan.js'

  import Navbar from '@/components/commons/Navbar'
  import Footer from '@/components/commons/Footer'
  import Comments from '@/components/wallpaper/Comments'
  import AddFavorite from '@/components/wallpaper/AddFavorite'

  import WallpaperApi from '@/service/WallpaperApi'
  import UserApi from '@/service/UserApi'
  import Storage from '@/storage'

  export default {
    data() {
      return {
        wallpaperId: "",
        wallpaper: {
          user: {},
          tags: []
        },
        showModal: false,
        stared: false,
        starLoading: false
      }
    },
    components: {
      Navbar, Footer, Comments, AddFavorite
    },
    created: function () {
      this.wallpaperId = this.$route.params.wallpaperId;
      this.query();
    },
    mounted: function () {
      var _self = this;
      this.$nextTick(function () {
        this.init();
      });
    },
    methods: {
      init: function () {
        $(".pan").pan();
      },
      query: function () {
        WallpaperApi.getWallpaper(this.wallpaperId).then((res) => {
          this.wallpaper = res.data.wallpaper;
        }).catch(err => {
          console.log(err);
        })
      },
      addStar: function () {
        this.starLoading = true;
        UserApi.addStar(this.wallpaperId).then((res) => {
          //这里需要做登录权限限制，如果已经有TOKEN，则不需根据路径判断是否登录。
          if (res.code == '1004009') {
            this.$confirm({
              size: "md",
              title: "系统提示信息",
              content: "您还未登录系统,请点击确认将引导您登录系统."
            }).then(() => {
              this.$router.push({path: '/login'})
            }).catch(() => {
              this.starLoading = false;
            })
          } else {
            this.stared = true;
            this.starLoading = false;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      openCollectionModal: function () {
        //先判断是否登录 AUTH_TOKEN是否存在
        let AUTH_TOKEN = Storage.get('AUTH_TOKEN');
        if (AUTH_TOKEN) {//已登录
          this.showModal = true;
        } else {
          this.$confirm({
            size: "md",
            title: "系统提示信息",
            content: "您还未登录系统,请点击确认将引导您登录系统."
          }).then(() => {
            this.$router.push({path: '/login'})
          }).catch(() => {
            //cancel
          })
        }
      },
      closeCollectionModal: function () {
        this.showModal = false;
      }
    }
  }
</script>
