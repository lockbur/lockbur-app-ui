<template>
  <section class="hbox stretch">
    <aside class="aside">
      <div class="list-group">
        <a class="list-group-item">收藏夹</a>
        <template v-for="item in collections">
          <a href="javascript:;" class="list-group-item" v-on:click="loadMore(item.id)">
            <span class="badge badge-empty">{{item.counts}}</span>
            <p class="list-group-item-text">
              <i class="fa fa-folder-o fa-fw"></i> {{item.name}}
            </p>
          </a>
        </template>
      </div>
    </aside>
    <section>
      <section class="panel panel-default">
        <div class="panel-body">
          <h3 class="m-t-none m-b">我收藏的图片</h3>
          <FlexImages ref="flexImages" :options="options">
            <div class="flex-images bg-white-only">
              <template v-for="item in list">
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
    </section>
  </section>
</template>
<script>
  import FlexImages from '@/components/utils/FlexImages'
  import Page from '@/components/utils/VuePage'

  import UsersApi from '@/service/UsersApi'

  export default {
    data() {
      return {
        username: "",
        collections: [],
        list: [],
        collectionName: "",
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
      this.queryCollections();
    },
    methods: {
      queryCollections: function () {
        UsersApi.getUserCollections(this.username).then((res) => {
          this.collections = res.data;
          //获取默认收藏夹的id
          var _self = this;
          this.collections.forEach(function (ele, index) {
            if (ele.defaultType === 'Y') {
              _self.collectionId = ele.id;
              _self.collectionName = ele.name;
              _self.loadMore();
              return false;//停止循环
            }
          });
        }).catch(err => {
          console.log(err);
        })
      },
      loadMore: function () {
        UsersApi.getUserFavorites(this.username, this.collectionId, this.page).then((res) => {
          this.list = res.data.content;
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
