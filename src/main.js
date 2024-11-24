import Vue from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import router from './router';

import './assets/main.css';

Vue.use(Antd);

/**
 * el: Vue 实例的挂载目标, 一个真实存在的dom节点, 可以使用CSS选择器, 也可以是一个HTMLElement实例
 * template: 模板字符串, 模板将会替换挂载的元素
 * render: 字符串模板的代替方案
 *
 * 若没有指定el选项, 则需要手动调用$mount()函数指定挂载节点
 * 若只有el选项, 没有指定template或者render函数, 则挂载dom节点的html会被提取出来用作模板
 */
new Vue({
  router,
  render(h) {
    return h(App);
  }
}).$mount('#app');
