<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>挂号订单</span>
            </div>
        </template>
        <el-form :inline="true">
            <el-form-item label="就诊人">
                <el-select placeholder="请选择就诊人" v-model="patientId" @change="getUserOrderInfo">
                    <el-option label="请选择全部就诊人" value=""></el-option>
                    <el-option :label="user.name" v-for="user in allUser" :key="user.id" :value="user.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="getUserOrderInfo">
                    <el-option label="请选择全部订单状态" value=""></el-option>
                    <el-option :label="order.comment" v-for="(order,index) in allOrderStatus" :key="index" :value="order.status"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table border class="infoTable" :data="orderRecodes">
            <el-table-column label="就诊时间" width="110" prop="reserveDate"></el-table-column>
            <el-table-column label="医院" width="160" prop="hosname"></el-table-column>
            <el-table-column label="科室" width="160" prop="depname"></el-table-column>
            <el-table-column label="医生" width="100" prop="title"></el-table-column>
            <el-table-column label="医事服务费" width="100" prop="amount"></el-table-column>
            <el-table-column label="就诊人" width="80" prop="patientName"></el-table-column>
            <el-table-column label="订单状态" width="160" prop="param.orderStatusString"></el-table-column>
            <el-table-column label="操作" width="80">
                <template #="{ row }">
                    <el-button type="text" @click="goDetail(row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
            @current-change="getUserOrderInfo" @size-change="getUserOrderInfo" />
    </el-card>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { reqUserOrderInfo, reqOrderStatus } from '@/api/user'
import type {
    UserOrderInfoResponseData,
    OrderRecords,
    OrderStatusResponseData,
    AllOrderStatus
} from '@/api/user/type'
import {reqVisitorList} from '@/api/hospital'
import type {VisitorArr,VisitorListResponseData} from '@/api/hospital/type'
export default defineComponent({
    name: 'AllOrder',
    setup() {
        const pageNo = ref<number>(1)
        const pageSize = ref<number>(10)
        const patientId = ref<string>('')
        const orderStatus = ref<string>('')
        const orderRecodes = ref<OrderRecords>([])
        const total = ref<number>(0)
        onMounted(() => {
            getUserOrderInfo()
            getAllUserAndOrderStatus()
        })
        const getUserOrderInfo = async () => {
            const result: UserOrderInfoResponseData = await reqUserOrderInfo(pageNo.value, pageSize.value, patientId.value, orderStatus.value)
            if (result.code == 200) {
                orderRecodes.value = result.data.records
                total.value = result.data.total
            }
        }
        const $router = useRouter()
        const goDetail = (row: any) => {
            $router.push({ path: '/user/order', query: { orderId: row.id } })
        }
        const allUser = ref<VisitorArr>([])
        const allOrderStatus = ref<AllOrderStatus>([])
        const getAllUserAndOrderStatus = async () => {
            const result1: VisitorListResponseData = await reqVisitorList()
            const result2: OrderStatusResponseData = await reqOrderStatus()
            allUser.value = result1.data
            allOrderStatus.value=result2.data
        }
        return {
            pageNo,
            pageSize,
            getUserOrderInfo,
            orderRecodes,
            total,
            goDetail,
            allUser,
            allOrderStatus,
            patientId,
            orderStatus
        }
    }
})
</script>
<style lang="scss" scoped>
.box-card {
    margin-top: 20px;

    .infoTable {
        margin: 10px 0;
    }
}
</style>