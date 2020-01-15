<template>
  <section>
    <div class="flex-images bg-white-only"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10">
      <template v-for="wallpaper in list">
        <a :href="'/#/wallpaper/'+wallpaper.id" target="_blank" class="item animated fadeInUp"
           :data-w="wallpaper.width"
           :data-h="wallpaper.height">
          <img src="/static/images/blank.gif"
               :data-src="'//img.wallbase.tv/'+wallpaper.thumbUrl+'?x-oss-process=style/thumb'">
        </a>
      </template>
    </div>
    <section>
      <div class="loading text-center"></div>
    </section>
  </section>
</template>
<script>
  import '@/assets/plugins/flexImages/jquery.flex-images.css'
  import '@/assets/plugins/flexImages/jquery.flex-images.js'
  import WallpaperApi from '@/service/WallpaperApi'

  export default {
    data() {
      return {
        list: [],
        page: 1,
        busy: false
      }
    },
    mounted: function () {
    },
    methods: {
      initFlexImages: function () {
        $('.flex-images').flexImages({
          rowHeight: 250
        });
      },
      loadMore: function () {
        this.busy = true;
        WallpaperApi.getRandom(this.page).then((res) => {
          if (res.data.list.length > 0) {
            this.list = this.list.concat(res.data.list);
            this.$nextTick(function () {
              this.initFlexImages();
              this.page++;
              this.busy = false;
            });
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
