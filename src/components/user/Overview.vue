<template>
  <section class="panel panel-default">
    <div class="panel-body">
      <h3 class="m-t-none m-b">最近上传的照片</h3>
      <div class="flex-images bg-white-only">
        <template v-for="wallpaper in list">
          <a :href="'/#/wallpaper/'+wallpaper.id" target="_blank" class="item animated fadeInUp"
             :data-w="wallpaper.width"
             :data-h="wallpaper.height">
            <img src="/static/images/blank.gif"
                 :data-src="'//img.wallbase.tv/'+wallpaper.thumbUrl+'?x-oss-process=style/thumb'">
          </a>
        </template>
      </div>
    </div>
  </section>
</template>
<script>
  import '@/assets/plugins/flexImages/jquery.flex-images.css'
  import '@/assets/plugins/flexImages/jquery.flex-images.js'
  import WallpaperApi from '@/service/WallpaperApi'

  export default {
    data() {
      return {
        list: []
      }
    },
    created: function () {
      this.query();
    },
    methods: {
      initFlexImages: function () {
        $('.flex-images').flexImages({
          rowHeight: 150
        });
      },
      query: function () {
        //默认第一页
        WallpaperApi.getDiscover(1).then((res) => {
          this.list = res.data.content;
          this.$nextTick(function () {
            this.initFlexImages();
          });
        }).catch(err => {
          console.log(err);
        })
      },
    }
  }
</script>
