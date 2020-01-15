<template>
  <modal ref="modal" v-model="showModal" title="选择收藏夹" @hide="hide" :footer="false">
    <div class="row row-sm">
      <template v-for="(item,idx) in collections">
        <div class="col-md-3">
          <div class="item">
            <div class="pos-rlt">
              <div :class="['item-overlay opacity r r-2x bg-black',{ active: item.collected}]">
                <div class="center text-center m-t-n">
                  <a href="#" class="">
                    <i class="fa fa-check i-3x text-success"></i>
                  </a>
                </div>
              </div>
              <a href="javascript:;" v-on:click="addFavorite(idx,item)">
                <img :src="'//img.wallbase.tv/'+item.cover+'?x-oss-process=style/cover'" class="r r-2x img-full">
              </a>
            </div>
            <div class="padder-v">
              <a class="text-ellipsis">{{item.name}}</a>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="row row-sm">
      <form class="m-b-none">
        <div class="input-group">
          <input type="text" class="form-control" v-model="collectionName">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" v-on:click="createCollection">
               <i class="fa fa-plus"></i> 创建收藏夹
            </button>
          </span>
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
  import UserApi from '@/service/UserApi'

  export default {
    props: {
      wallpaperId: {
        type: String,
        required: true
      },
      show: {
        type: Boolean,
        required: true,
        default: false
      },
      callback: {
        type: Function,
        default: function () {
          return function callback() {
          }
        }
      }
    },
    data() {
      return {
        showModal: false,
        collections: [],
        collectionName: ""
      }
    },
    watch: {
      'show': function (val) {
        this.showModal = this.show;
        if (val) {
          console.log("watch show" + val);
          this.queryCollections();
        }
      }
    },
    created: function () {
    },
    methods: {
      hide: function () {
        this.callback();
      },
      queryCollections: function () {
        UserApi.getCollections().then((res) => {
          if (res.code == '1004009') {
            this.$confirm({
              size: "md",
              title: "系统提示信息",
              content: "您还未登录系统,请点击确认将引导您登录系统."
            }).then(() => {
              this.$router.push({path: '/login'})
            }).catch(() => {
              //cancel
            })
          } else {
            this.collections = res.data;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      addFavorite: function (idx, item) {
        //item.id is collectionId
        UserApi.addFavorite(item.id, this.wallpaperId).then((res) => {
          if (res.code === '2000000') {
            this.$set(this.collections[idx], 'collected', true);
          } else {
            this.$notify({
              type: 'danger',
              duration: 0,
              title: '错误提示',
              content: '你已经收藏过了该图片.'
            });
          }
        }).catch(err => {
          console.log(err);
        })
      },
      createCollection() {
        if (this.collectionName == "") {
          this.$notify({
            type: 'warning',
            duration: 0,
            title: '系统提示',
            content: '收藏夹名字不能为空.'
          });
        } else {
          UserApi.createCollection(this.collectionName).then((res) => {
            if (res.code == '1004009') {
              this.$confirm({
                size: "md",
                title: "系统提示信息",
                content: "您还未登录系统,请点击确认将引导您登录系统."
              }).then(() => {
                this.$router.push({path: '/login'})
              }).catch(() => {
                //cancel
              })
            } else {
              //成功
              this.collectionName = "";
              this.$notify({
                type: 'info',
                duration: 0,
                title: '系统提示',
                content: '创建收藏夹成功.'
              });
              this.queryCollections();
            }
          }).catch(err => {
            console.log(err);
          })
        }
      }//createCollection
    }
  }
</script>
