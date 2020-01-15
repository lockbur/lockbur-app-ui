<template>
  <div v-show="show" :transition="transition">
    <div class="modal" @click.self="clickMask">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">
              <a type="button" class="close" @click="close">x</a>
              <h4 class="modal-title">
                <slot name="title">
                  {{title}}
                </slot>
              </h4>
            </slot>
          </div>
          <slot name="modal-body"></slot>
        </div>
      </div>
    </div>
    <div class="modal-backdrop in"></div>
  </div>
</template>
<script>
  /**
   * Bootstrap Style Modal Component for Vue
   * Depend on Bootstrap.css
   */
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Modal'
      },
      // 自定义组件transition
      transition: {
        type: String,
        default: 'modal'
      },
      // 默认为false，由父组件控制prop.show来关闭
      closeWhenOK: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // showModal: this.show,
        duration: null
      };
    },
    beforeDestroy() {
      document.body.className = document.body.className.replace(/\s?modal-open/, '');
    },
    watch: {
      showModal(value) {
        // 在显示时去掉body滚动条，防止出现双滚动条
        if (value) {
          document.body.className += ' modal-open';
        } else {
          // 在modal动画结束后再加上body滚动条
          if (!this.duration) {
            this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
          }
          window.setTimeout(() => {
            document.body.className = document.body.className.replace(/\s?modal-open/, '');
          }, this.duration || 0);
        }
      }
    },
    methods: {
      close() {
        this.$emit('close');
        //this.show = false;
      },
      // 点击遮罩层
      clickMask() {
        if (!this.force) {
          this.cancel();
        }
      }
    }
  };
</script>
<style scoped>
  .modal {
    display: block;
  }

  .modal-transition {
    transition: all .6s ease;
  }

  .modal-leave {
    /* 样式没什么用，但可以让根标签的transitionEnd生效，以去掉modal-leave */
    border-radius: 1px !important;
  }

  .modal-transition .modal-dialog, .modal-transition .modal-backdrop {
    transition: all .5s ease;
  }

  .modal-enter .modal-dialog, .modal-leave .modal-dialog {
    opacity: 0;
    transform: translateY(-30%);
  }

  .modal-enter .modal-backdrop, .modal-leave .modal-backdrop {
    opacity: 0;
  }
</style>
