<template>
    <div class="container">
        <h1 class="tip">确认挂号信息</h1>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button type="primary" :icon="User" @click="goUser">添加就诊人</el-button>
                </div>
            </template>
            <div class="visitors">
                <Visitor v-for="visitor in visitorListArr" :key="visitor.id" :visitor="visitor" class="item"
                 @click="changeIndex(visitor.id)" :currentVisitorId="currentVisitorId"/>
            </div>
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">就诊日期：</div>
                    </template>
                    {{doctorWork.workDate}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">就诊医院：</div>
                    </template>
                    {{doctorWork.param?.hosname}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">就诊科室：</div>
                    </template>
                    {{doctorWork.param?.depname}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医生姓名：</div>
                    </template>
                    {{doctorWork.docname}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医生职称：</div>
                    </template>
                    {{doctorWork.title}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医生专长：</div>
                    </template>
                    {{doctorWork.skill}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医事服务费：</div>
                    </template>
                    <span style="color: red;">{{doctorWork.amount}}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <div class="btn">
            <el-button type="primary" size="large" 
            :disabled="currentVisitorId==-1" @click="submitOrder">确认挂号</el-button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRoute,useRouter } from 'vue-router'
import { reqVisitorList,reqDoctorWork } from '@/api/hospital'
import type { VisitorListResponseData, VisitorArr,DoctorWorkResponseData } from '@/api/hospital/type'
import {
    reqSubmitOrder
 } from '@/api/user'
export default defineComponent({
    name: 'ReserveStepTwo',
    setup() {
        onMounted(() => {
            fetchVisitorList()
            fetchDoctorWork()
        })
        const fetchVisitorList = async () => {
            const result: VisitorListResponseData = await reqVisitorList()
            if (result.code == 200) {
                visitorListArr.value = result.data
            }
        }
        const $route=useRoute()
        const $router=useRouter()
        const doctorWork=ref<any>({})
        const fetchDoctorWork=async ()=>{
            const result:DoctorWorkResponseData=await reqDoctorWork($route.query.scheduleId as string)
            if(result.code==200){
                doctorWork.value=result.data
            }
        }
        const currentVisitorId=ref<number>(-1)
        const changeIndex=(id:number)=>{
            currentVisitorId.value=id
        }
        const visitorListArr = ref<VisitorArr>([])
        
        const submitOrder=async ()=>{
            const result=await reqSubmitOrder(doctorWork.value.hoscode,doctorWork.value.id,currentVisitorId.value)
            if(result.code==200){
                $router.push(`/user/order?orderId=${result.data}`)
            }else{
                ElMessage({
                    type:'error',
                    message:result.message
                })
            }
        }
        const goUser=()=>{
            $router.push({path:'/user/patient',query:{type:'add'}})
        }
        return {
            User,
            visitorListArr,
            doctorWork,
            changeIndex,
            currentVisitorId,
            submitOrder,
            goUser
        }
    }
})
</script>
<style lang="scss" scoped>
.container {
    .tip {
        font-weight: 900;
        font-size: 20px;
    }

    .box-card {
        margin: 20px 0;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .visitors {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 32%;
                margin: 10px 6px;
            }
        }
    }

    .btn {
        display: flex;
        justify-content: center;
        margin: 10px 0;

        :deep(.el-button) {
            width: 250px;
        }
    }
}</style>