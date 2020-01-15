<template>
  <section class="panel panel-default">
    <header class="panel-heading">浏览设置</header>
    <div class="panel-body">
      <form role="form">
        <div class="form-group">
          <label>Thumb Size</label>
          <select class="form-control">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
          </select>
        </div>
        <div class="form-group">
          <label>Thumbs Per Page</label>
          <select class="form-control">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
          </select>
        </div>
        <div class="form-group">
          <label>Scrolling Style</label>
          <select class="form-control">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
          </select>
        </div>
        <div class="form-group">
          <label>Open thumbs in</label>
          <select class="form-control">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
          </select>
        </div>
        <div class="line line-dashed b-b line-lg pull-in"></div>
        <div class="form-group">
          <div class="checkbox i-checks">
            <label>
              <input type="checkbox">
              <i></i>
              Option one
            </label>
          </div>
          <div class="checkbox i-checks">
            <label>
              <input type="checkbox" checked="">
              <i></i>
              Option two checked
            </label>
          </div>
          <div class="checkbox i-checks">
            <label>
              <input type="checkbox" >
              <i></i>
              Option three checked and disabled
            </label>
          </div>
        </div>
      </form>
    </div>
    <div class="panel-footer">
      <button type="button" class="btn btn-default">
        <i class="fa fa-save fa-fw"></i> 保存
      </button>
    </div>
  </section>
</template>
<script>

  export default {
    data() {
      return {}
    },
    components: {},
    mounted: function () {
    },
    created: function () {
    },
    methods: {}
  }
</script>
