<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>意见反馈</span>
            </div>
        </template>
        <el-empty description="暂无信息" />
    </el-card>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    name:'Feedback',
    setup(){
        return {
        }
    }
})
</script>
<style lang="scss" scoped>
.box-card {
    margin-top: 20px;
}
</style>