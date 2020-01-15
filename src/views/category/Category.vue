<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="row m-t-md no-gutter">
        <div class="col-md-2">
          <div class="list-group">
            <span class="list-group-item">壁纸画廊(Galleries)</span>
            <a href="#" class="list-group-item">
              <i class="fa fa-eye"></i> 抽象(Abstract)
            </a>
            <a href="#" class="list-group-item">
              <i class="fa fa-plane"></i>飞行器(Aircraft)
            </a>
            <a href="#" class="list-group-item"><i class="fa fa-puzzle-piece"></i> 动物(Animals)</a>
            <a href="#" class="list-group-item"><i class="fa fa-subscript"></i> 动漫(Anime)</a>
            <a href="#" class="list-group-item"><i class="fa fa-building-o"></i> 建筑(Architecture)</a>
            <a href="#" class="list-group-item"><i class="fa fa-anchor"></i> 船(Boats)</a>
            <a href="#" class="list-group-item"><i class="fa fa-road"></i> 汽车(Cars)</a>
            <a href="#" class="list-group-item"><i class="fa fa-music"></i> 娱乐(Entertainment)</a>
            <a href="#" class="list-group-item"><i class="fa fa-trophy"></i> 摩托车(Motorcycles)</a>
            <a href="#" class="list-group-item"><i class="fa fa-picture-o"></i> 自然风景(Nature)</a>
            <a href="#" class="list-group-item"><i class="fa fa-user"></i> 人物(People)</a>
            <a href="#" class="list-group-item"><i class="fa fa-flag-checkered"></i> 太空宇宙(Space)</a>
            <a href="#" class="list-group-item"><i class="fa fa-magic"></i> 体育(Sports)</a>
            <a href="#" class="list-group-item"><i class="fa fa-magnet"></i> 技术(Technology)</a>
            <a href="#" class="list-group-item"><i class="fa fa-video-camera"></i> 视频游戏(Video Games)</a>
          </div>
        </div>
        <div class="col-md-10">
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
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
  import '@/assets/plugins/flexImages/jquery.flex-images.css'
  import '@/assets/plugins/flexImages/jquery.flex-images.js'
  import Navbar from '@/components/commons/Navbar'
  import Footer from '@/components/commons/Footer'
  import WallpaperApi from '@/service/WallpaperApi'
  export default {
    components: {
      Navbar, Footer
    },
    data () {
      return {
        list: [],
        page: 1,
        busy: false
      }
    },
    methods: {
      initFlexImages () {
        $('.flex-images').flexImages({
          rowHeight: 250,
          truncate: 1
        })
      },
      loadMore () {
        this.busy = true
        WallpaperApi.getDiscover(this.page).then((res) => {
          if (res.data.content !== undefined && res.data.content.length > 0) {
            this.list = this.list.concat(res.data.content)
            this.$nextTick(function () {
              this.initFlexImages()
              this.page++
              this.busy = false
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
