import Toast from './Toast'

var ToastPlugin = {};

ToastPlugin.install = function (Vue) {
  console.log("install");
  Vue.prototype.$Toast = function (tips) {
    console.log(tips);
    const ToastController = Vue.extend(Toast)
    var instance = new ToastController().$mount();
    console.log(instance.$el);
    document.body.appendChild(instance.$el)
  };
}
export default ToastPlugin;
