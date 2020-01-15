<template>
  <section class="scrollable wrapper">
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
      init: function () {
        $('.flex-images').flexImages({
          rowHeight: 250,
          truncate: 1
        });
      },
      query: function () {
        WallpaperApi.getTop().then((res) => {
          this.list = res.data.content;
          this.$nextTick(function () {
            this.init();
          });
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
