<template lang="html">
  <div class="text-center">
    <ul class="pagination">
      <li v-if="page != 1">
        <a href="javascript:;" v-on:click="btnClick(page - 1)">
          <i class="fa fa-chevron-left"></i> 上一页
        </a>
      </li>
      <li v-for="idx in pagination" :class="{ active: page == idx}">
        <a href="javascript:;" v-on:click="btnClick(idx)">
          {{ idx }}
        </a>
      </li>
      <li v-if="page < totals">
        <a href="javascript:;" v-on:click="btnClick(page + 1)">
          下一页 <i class="fa fa-chevron-right"></i>
        </a>
      </li>
      <li class="disabled" v-if="totals == 0">
        <a>没有任何数据了</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      page: {
        type: [Number],
        required: true
      },
      totals: {
        type: [Number],
        required: true
      },
      callback: {
        default() {
          return function callback() {
          }
        }
      }
    },
    computed: {
      pagination() {
        var left = 1
        var right = this.totals
        var ar = []
        if (this.totals >= 11) {
          if (this.page > 5 && this.page < this.totals - 4) {
            left = this.page - 5
            right = this.page + 4
          } else {
            if (this.page <= 5) {
              left = 1
              right = 10
            } else {
              right = this.totals
              left = this.totals - 9
            }
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
        return ar
      }
    },
    methods: {
      btnClick(page) {
        if (page != this.page) {
          this.callback(page)
        }
      }
    }
  }
</script>

