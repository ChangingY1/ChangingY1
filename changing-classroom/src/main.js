import { createApp } from 'vue'
import App from './App.vue'

// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入路由
import router from './router'

import VueCookies from 'vue-cookies'


const app = createApp(App)

app.config.globalProperties.$cookies = VueCookies

app.use(ElementPlus)

app.use(router)

app.mount('#app')