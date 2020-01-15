<template>
  <section>
    <div class="flex-images bg-white-only">
      <template v-for="wallpaper in list">
        <a
          :key="wallpaper.id"
          :href="'/#/wallpaper/'+wallpaper.id"
          :data-w="wallpaper.width"
          :data-h="wallpaper.height"
          target="_blank"
          class="item animated fadeInUp">
          <img
            :data-src="'//img.wallbase.tv/'+wallpaper.thumbUrl+'?x-oss-process=style/thumb'"
            src="/static/images/blank.gif">
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
    data () {
      return {
        list: []
      }
    },
    created: function () {
      this.query()
    },
    methods: {
      initFlexImages: function () {
        $('.flex-images').flexImages({
          rowHeight: 250,
          truncate: 1
        })
      },
      query () {
        WallpaperApi.getTop().then((res) => {
          if (res.data.list.length > 0) {
            this.list = this.list.concat(res.data.list)
            this.$nextTick(function () {
              this.initFlexImages()
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
