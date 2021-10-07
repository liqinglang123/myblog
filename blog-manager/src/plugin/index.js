import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueParticles from 'vue-particles'
import Plugin from './plugin'


import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'



// 注册 element-ui 组件库插件
Vue.use(ElementUI);

// 注册plugin组件
Vue.use(Plugin)

// 注册粒子组件
Vue.use(VueParticles)

// 注册富文本编辑器
Vue.use(VueQuillEditor)