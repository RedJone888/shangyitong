<template>
    <div class="user">
        <div class="menu">
            <div class="top">
                <el-icon>
                    <House />
                </el-icon>
                <span>/ 会员中心</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/user/certification" @click="goUser('certification')">
                    <el-icon>
                        <Postcard />
                    </el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order" @click="goUser('order')">
                    <el-icon>
                        <Memo />
                    </el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/patient" @click="goUser('patient')">
                    <el-icon>
                        <ElUser />
                    </el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/profile" @click="goUser('profile')">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/feedback" @click="goUser('feedback')">
                    <el-icon>
                        <ChatDotRound />
                    </el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import {useRoute,useRouter} from 'vue-router'
import { Postcard, Memo, User as ElUser, Document, ChatDotRound, House } from '@element-plus/icons-vue'
export default defineComponent({
    name: 'User',
    components: { Postcard, Memo, ElUser, Document, ChatDotRound, House },
    setup() {
        const $router=useRouter()
        const $route=useRoute()
        const goUser=(pathTail:string)=>{
            $router.push({path:`/user/${pathTail}`})
        }
        return {
            goUser
        }
    }
})
</script>
<style lang="scss" scoped>
.user {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top {
            display: flex;
            color: #7f7f7f;

            span {
                margin-left: 5px;
            }
        }
    }

    .content {
        flex: 8;
    }
}</style>