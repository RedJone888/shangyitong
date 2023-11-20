<template>
    <div class="hospital">
        <div class="menu">
            <div class="top">
                <el-icon><House /></el-icon>
                <span>/ 医院信息</span>
            </div>
            <el-menu :default-active="$route.path" 
            class="el-menu-vertical-demo">
                <el-menu-item index="/hospital/reserve" @click="changeActive('reserve')">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/hospital/detail" @click="changeActive('detail')">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item index="/hospital/notice" @click="changeActive('notice')">
                    <el-icon>
                        <Bell />
                    </el-icon>
                    <span>预约须知</span>
                </el-menu-item>
                <el-menu-item index="/hospital/close" @click="changeActive('close')">
                    <el-icon>
                        <Warning />
                    </el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item index="/hospital/query" @click="changeActive('query')">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent,onMounted } from 'vue'
import {useRouter,useRoute} from 'vue-router'
import useDetailStore from '@/store/modules/hospitalDetail'
import {
    Calendar,
    Document,
    Bell,
    Warning,
    Search,
    House
} from '@element-plus/icons-vue'
export default defineComponent({
    name: 'Hospital',
    components: { Calendar, Document, Bell, Warning, Search,House },
    setup() {
        const $router=useRouter()
        const $route=useRoute()
        const detailStore=useDetailStore()
        const changeActive=(pathTail:string)=>{
            const path=`/hospital/${pathTail}`
            $router.push({path,query:{hoscode:$route.query.hoscode}})
        }
        onMounted(()=>{
            detailStore.getHospital($route.query.hoscode as string)
            detailStore.getDepartment($route.query.hoscode as string)
        })
        return {
            changeActive
        }
    }
})
</script>
<style lang="scss" scoped>
.hospital {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top{
            display: flex;
            color: #7f7f7f;
            span{
                margin-left: 5px;
            }
        }
    }

    .content {
        flex: 8;
    }
}
</style>