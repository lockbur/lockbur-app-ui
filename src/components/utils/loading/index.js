var Toast = {};
var showToast = false; // 存储toast显示状态
var toastVM = null; // 存储toast vm

Toast.install = function (Vue, options) {
  var opt = {
    duration: '2500',
    wordWrap: false
  };
  for (var property in options) {
    opt[property] = options[property];
  }

  Vue.prototype.$toast = function (tips) {
    var wordWrap = opt.wordWrap ? 'lx-word-wrap' : '';
    var style = opt.width ? 'style="width: ' + opt.width + '"' : '';
    var tmp = '<div v-show="show" class="lx-toast ' + wordWrap + '" ' + style + '>{{tip}}</div>';

    if (showToast) {
      // 如果toast还在，则不再执行
      return;
    }
    if (!toastVM) {
      var toastTpl = Vue.extend({
        data: function () {
          return {
            show: showToast,
            tip: tips,
            type: 'lx-toast-' + curType
          }
        },
        template: tmp
      });
      toastVM = new toastTpl()
      var tpl = toastVM.$mount().$el;
      document.body.appendChild(tpl);
    }
    toastVM.tip = tips;
    toastVM.show = showToast = true;

    setTimeout(function () {
      toastVM.show = showToast = false;
    }, opt.duration);
  };
}
export default Toast;
