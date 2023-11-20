<template>
    <div class="top">
        <div class="content">
            <div class="left" @click="goHome">
                <img src="../../assets/images/logo.png" alt="">
                <p>尚医通 预约挂号统一平台</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{userStore.userInfo.name}}
                        <el-icon class="el-icon--right">
                            <ArrowDown />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="goUser('certification')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="goUser('order')">挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="goUser('patient')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
export default defineComponent({
    name: 'HospitalTop',
    components:{ArrowDown},
    setup() {
        const $router = useRouter()
        const userStore = useUserStore()
        const goHome = () => {
            $router.push({ path: '/home' })
        }
        const login = () => {
            userStore.visiable = true
        }
        const logout=()=>{
            userStore.userLogout()
            $router.push('/home')
        }
        const goUser=(pathTail:string)=>{
            $router.push({ path: `/user/${pathTail}` })
        }
        return {
            goHome,
            login,
            userStore,
            logout,
            goUser
        }
    }
})
</script>
<style lang="scss" scoped>
.top {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: center;

    .content {
        width: 1200px;
        height: 70px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }

            p {
                font-size: 20px;
                color: #55a6fe;
            }
        }

        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #aaa;

            .help {
                margin-right: 10px;
            }
        }
    }
}</style>