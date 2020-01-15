<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="row m-t-md no-gutter">
        <div class="col-md-2">
          <div class="list-group">
            <span class="list-group-item">壁纸画廊(Galleries)</span>
            <template v-for="item in gallery">
              <a :href="'/gallery/'+item.id" :key="item.id" class="list-group-item">
                <i :class="item.code"></i> {{item.name}}
              </a>
            </template>
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

  import GalleryApi from '@/service/GalleryApi'

  export default {
    components: {
      Navbar, Footer
    },
    data () {
      return {
        gallery: []
      }
    },
    created () {
      this.getGallery()
    },
    methods: {
      getGallery () {
        GalleryApi.getGallery().then((res) => {
          this.gallery = res.data.list
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>
  .list-group a {
    color: #46678A;
  }
</style>
