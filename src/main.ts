//引入创建应用实例的方法
import { createApp } from 'vue'
//引入重置样式
import '@/style/reset.scss'
//引入根组件
import App from '@/App.vue'
//引入全局组件
import HospitalTop from '@/components/hosptial_top/index.vue'
import HosptialBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
import Visitor from '@/components/visitor/index.vue'
//引入路由器
import router from '@/router'
//引入仓库
import pinia from '@/store'
//引入element-plus插件
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
//创建应用实例
const app = createApp(App)
//注册全局组件
app.component('HospitalTop', HospitalTop)
app.component('HosptialBottom', HosptialBottom)
app.component('Login', Login)
app.component('Visitor', Visitor)
//安装路由器
app.use(router)
//安装仓库
app.use(pinia)
//安装element-plus
app.use(ElementPlus, {
  locale: zhCn,
})
import './permisstion'
//挂载应用实例到根结点
app.mount('#app')
