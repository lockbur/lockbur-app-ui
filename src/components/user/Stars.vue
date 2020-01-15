<template>
  <section class="panel panel-default">
    <div class="panel-body">
      <h3 class="m-t-none m-b">我喜欢的图片</h3>
      <FlexImages ref="flexImages" :options="options">
        <div class="flex-images bg-white-only">
          <template v-for="item in items">
            <a :href="'/#/wallpaper/'+item.wallpaperId"
               :data-w="item.width"
               :data-h="item.height"
               target="_blank"
               class="item animated fadeInUp">
              <img src="/static/images/blank.gif"
                   :data-src="'//img.wallbase.tv/'+item.thumbUrl+'?x-oss-process=style/thumb'">
            </a>
          </template>
        </div>
      </FlexImages>
      <Page :page="page" :totals="totalPages" :callback="callback"></Page>
    </div>
  </section>
</template>
<script>
  import Page from '@/components/utils/VuePage'
  import FlexImages from '@/components/utils/FlexImages'

  import UsersApi from '@/service/UsersApi'

  export default {
    data() {
      return {
        username: "",
        items: [],
        page: 1,
        totalPages: 0,
        options: {
          selector: ".flex-images",
          container: '.item',
          object: 'img',
          rowHeight: 180,
          maxRows: 0,
          truncate: 0
        }
      }
    },
    components: {
      Page, FlexImages
    },
    created: function () {
      this.username = this.$route.params.username;
      this.loadMore();
    },
    methods: {
      loadMore: function () {
        UsersApi.getUserStars(this.username, this.page).then((res) => {
          this.items = res.data.content;
          this.totalPages = res.data.totalPages;
          this.$nextTick(function () {
            this.$refs.flexImages.init();
          });
        }).catch(err => {
          console.log(err);
        })
      },
      callback(page) {
        this.page = page;
        this.loadMore();
      }
    }
  }
</script>
