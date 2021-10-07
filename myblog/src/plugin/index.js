import Vue from 'vue'
import Plugin from './plugin'

// 使用轮播图
import VueCarousel from 'vue-carousel'
// 使用粒子效果
import VueParticles from 'vue-particles'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

// import animated from 'animate.css'

import 'wowjs/css/libs/animate.css'

import 'animate.css'

import VueLazyLoad from 'vue-lazyload'

// 注册animate
// Vue.use(animated)

// 注册iview组件库
Vue.use(iView);

Vue.use(VueParticles)
Vue.use(VueCarousel)

// 注册Plugin插件
Vue.use(Plugin)

// 注册懒加载插件
Vue.use(VueLazyLoad)