<template>
    <div class="search">
        <el-autocomplete clearable class="inline-input w-50"
            placeholder="请输入医院名称" v-model="hosname"
            :fetch-suggestions="fetchData" :trigger-on-focus="false"
            @select="goDetail"/>
        <el-button type="primary" size="default" :icon="Search"></el-button>
    </div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue'
import { useRouter } from 'vue-router'

import { Search } from '@element-plus/icons-vue'

import {reqHospitalInfo} from '@/api/home'
import {HospitalInfoResponseData} from '@/api/home/type'


export default defineComponent({
    name: 'Search',
    setup() {
        const hosname=ref<string>('')
        const fetchData=async (keyword:string,cb:any)=>{
            const result:HospitalInfoResponseData =await reqHospitalInfo(keyword)
            if(result.code===200){
                const showData=result.data.map(item=>({value:item.hosname,hoscode:item.hoscode}) )
                cb(showData)
            }
        }
        const $router=useRouter()
        const goDetail=(item:any)=>{
            $router.push({path:'/hospital/reserve',query:{hoscode:item.hoscode}})
        }
        return {
            Search,
            hosname,
            fetchData,
            goDetail
        }
    }
})
</script>
<style lang="scss" scoped>
.search{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    :deep(.el-input__wrapper){
        width: 600px;
        margin-right: 10px;
    }
}
</style>