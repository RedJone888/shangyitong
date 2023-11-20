import router from '@/router'
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });
import useUserStore from '@/store/modules/user'
import pinia from '@/store'
const userStore=useUserStore(pinia)
const whiteList=['/home','/hospital/reserve','/hospital/detail','/hospital/notice','/hospital/close','/hospital/query',]
router.beforeEach((to,from,next)=>{
    NProgress.start();
    document.title=`尚医通-${to.meta.title}`
    const token = userStore.userInfo.token
    if(token){
        next()
    }else{
        if(whiteList.includes(to.path)){
            next()
        }else{
            userStore.visiable=true
            next({path:'/home',query:{redirect:to.fullPath}})
        }
    }
})
router.afterEach((to,from)=>{
    NProgress.done();
})
