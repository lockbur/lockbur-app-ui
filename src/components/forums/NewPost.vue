<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <section class="scrollable wrapper-lg">
        <ul class="breadcrumb">
          <li><a href="#"><i class="fa fa-home"></i> Home</a></li>
          <li><a href="#"><i class="fa fa-list-ul"></i> Elements</a></li>
          <li class="active">Components</li>
        </ul>
        <div class="panel panel-default">
          <div class="panel-heading">新建贴子</div>
          <div class="panel-body">
            <p class="text-muted">说明文件</p>
            <div class="form-group">
              <label>标题</label>
              <input type="text" class="form-control" v-model="post.title">
            </div>
            <div class="form-group">
              <label>内容</label>
              <mavon-editor :boxShadow="editor.boxShadow"
                            :toolbars="editor.toolbars"
                            @change="change"/>
            </div>
          </div>
          <div class="panel-footer">
            <button class="btn btn-default" v-on:click="save">保存</button>
          </div>
        </div>
      </section>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Navbar from '@/components/commons/Navbar'
  import Footer from '@/components/commons/Footer'

  import mavonEditor from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  import UserApi from '@/service/UserApi'

  export default {
    data() {
      return {
        boardId: "",
        board: {},
        post: {
          title: "",
          markdown: "",
          content: "",
        },
        editor: {
          boxShadow: false,
          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: false, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            htmlcode: true, // 展示html源码
            help: true, // 帮助
            /* 1.3.5 */
            undo: true, // 上一步
            redo: true, // 下一步
            /* 2.1.8 */
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            /* 2.2.1 */
            subfield: true, // 单双栏模式
            preview: true, // 预览
          }
        }
      }
    },
    components: {
      Navbar,
      Footer,
      'mavon-editor': mavonEditor.mavonEditor
    },
    created: function () {
      this.boardId = this.$route.params.boardId;
    },
    methods: {
      change: function (value, render) {
        this.post.markdown = value;
        this.post.content = render;
      },
      save: function () {
        UserApi.newPost(this.boardId, this.post).then((res) => {
          console.log(res.data.postId);
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
