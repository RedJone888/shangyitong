<template>
    <div class="query">
        <h1>{{ detailStore.hospitalDetailInfo.hospital?.hosname }}查询取消信息</h1>
        <el-empty description="暂无信息" />
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import useDetailStore from '@/store/modules/hospitalDetail';
export default defineComponent({
    name:'Query',
    setup(){
        const detailStore=useDetailStore()
        return {
            detailStore
        }
    }
})
</script>
<style lang="scss" scoped>
.query{
    h1{
        text-align: center;
        font-size: 20px;
        font-weight: 900;
    }
}
</style>