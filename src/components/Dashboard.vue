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
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import '@/assets/plugins/vegas/vegas.css'
  import '@/assets/plugins/vegas/vegas.js'

  import Navbar from '@/components/commons/Navbar'
  import Footer from '@/components/commons/Footer'

  export default {
    components: {
      Navbar, Footer
    },
    data() {
      return {}
    }
  }
</script>
<style scoped>
.list-group a{
  color: #46678A;
}
</style>
