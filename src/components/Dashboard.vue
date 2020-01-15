<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <router-view></router-view>
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
    data() {
      return {}
    },
    components: {
      Navbar, Footer
    }
  }
</script>
