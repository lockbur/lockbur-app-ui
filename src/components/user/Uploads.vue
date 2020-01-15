<template>
  <section class="panel panel-default">
    <div class="panel-body">
      <h3 class="m-t-none m-b">最近上传的照片</h3>
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
  </section>
</template>
<script>
  import '@/assets/plugins/flexImages/jquery.flex-images.css'
  import '@/assets/plugins/flexImages/jquery.flex-images.js'
  import UsersApi from '@/service/UsersApi'

  export default {
    data() {
      return {
        username: "",
        list: [],
        page: 1,
        busy: false
      }
    },
    created: function () {
      this.username = this.$route.params.username;
    },
    methods: {
      initFlexImages: function () {
        $('.flex-images').flexImages({
          rowHeight: 150
        });
      },
      loadMore: function () {
        this.busy = true;
        UsersApi.getUserUploads(this.username, this.page).then((res) => {
          if (res.data.content != undefined && res.data.content.length > 0) {
            this.list = this.list.concat(res.data.content);
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
