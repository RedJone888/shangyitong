<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="detail">
                    <span>挂号详情</span>
                </div>
            </template>
            <div class="top">
                <el-tag class="ml-2" type="success">
                    <div class="tag">
                        <svg t="1700116761081" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4288" width="16" height="16">
                            <path
                                d="M817.728 198.72l111.744 114.56-545.216 532.128-285.92-273.024 110.528-115.712 174.176 166.336z"
                                fill="#1afa29" p-id="4289"></path>
                        </svg>
                        <span>{{ orderInfo.param?.orderStatusString }}</span>
                    </div>
                </el-tag>
                <div class="right_info">
                    <img src="../../../../assets/images/code_app.png" alt="">
                    <div class="info">
                        <p>
                            <span>微信</span>
                            <svg t="1700117382338" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5403" width="16" height="16">
                                <path
                                    d="M135.934972 64.303538l752.130056 0c39.559994 0 71.631434 32.069393 71.631434 71.629387l0 752.132102c0 39.559994-32.07144 71.631434-71.631434 71.631434l-752.130056 0c-39.562041 0-71.631434-32.07144-71.631434-71.631434L64.303538 135.932925C64.303538 96.372931 96.372931 64.303538 135.934972 64.303538z"
                                    fill="#3CAF34" p-id="5404"></path>
                                <path
                                    d="M639.977743 396.113643c8.237615 0 16.389272 0.589424 24.471344 1.494027C642.456191 295.204395 532.9788 219.119533 408.005484 219.119533c-139.720182 0-254.162654 95.216595-254.162654 216.140689 0 69.826322 38.075177 127.117143 101.703333 171.585937l-25.419949 76.453253 88.851631-44.548612c31.79003 6.282077 57.301054 12.762675 89.027639 12.762675 7.975649 0 15.880689-0.398066 23.727401-1.013073-4.964058-16.981766-7.845689-34.777061-7.845689-53.255924C423.88822 486.210637 519.241938 396.113643 639.977743 396.113643L639.977743 396.113643zM501.526461 322.041624c21.701255 0 39.292911 17.59268 39.292911 39.294958s-17.591657 39.293935-39.292911 39.293935c-21.703301 0-39.294958-17.59268-39.294958-39.293935C462.231503 339.635327 479.825207 322.041624 501.526461 322.041624L501.526461 322.041624zM323.697333 401.423579c-21.701255 0-39.294958-17.59268-39.294958-39.293935 0-21.701255 17.593703-39.293935 39.294958-39.293935 21.703301 0 39.294958 17.59268 39.294958 39.293935C362.992291 383.829875 345.400634 401.423579 323.697333 401.423579L323.697333 401.423579zM870.157169 595.018785c0-101.612259-101.67775-184.441733-215.882815-184.441733-120.931257 0-216.172411 82.82845-216.172411 184.441733 0 101.788268 95.241154 184.436616 216.172411 184.436616 25.307386 0 50.839899-6.388501 76.260871-12.760628l69.716828 38.184671-19.119453-63.516616C832.150554 703.091176 870.157169 652.339282 870.157169 595.018785L870.157169 595.018785zM587.860758 566.534034c-15.45397 0-27.981285-12.530384-27.981285-27.983331 0-15.454994 12.527314-27.981285 27.981285-27.981285 15.45397 0 27.982308 12.527314 27.982308 27.981285C615.843066 554.004673 603.314729 566.534034 587.860758 566.534034L587.860758 566.534034zM727.581963 568.121182c-15.456017 0-27.982308-12.529361-27.982308-27.981285 0-15.456017 12.527314-27.981285 27.982308-27.981285 15.45397 0 27.982308 12.526291 27.982308 27.981285C755.565295 555.591821 743.035934 568.121182 727.581963 568.121182L727.581963 568.121182z"
                                    fill="#FFFFFF" p-id="5405"></path>
                            </svg>
                            <span>关注”北京114预约挂号“</span>
                        </p>
                        <p>”快速预约挂号“</p>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="left">
                    <el-descriptions class="margin-top" :column="1" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">就诊人信息</div>
                            </template>
                            {{ orderInfo.patientName }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">就诊日期</div>
                            </template>
                            {{ orderInfo.reserveDate }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">就诊医院</div>
                            </template>
                            {{ orderInfo.hosname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">就诊科室</div>
                            </template>
                            {{ orderInfo.depname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">医生职称</div>
                            </template>
                            {{ orderInfo.title }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">医事服务费</div>
                            </template>
                            <span style="color: red;">{{ orderInfo.amount }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">挂号单号</div>
                            </template>
                            {{ orderInfo.outTradeNo }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">挂号时间</div>
                            </template>
                            {{ orderInfo.createTime }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <div class="btn" v-if="orderInfo.orderStatus != -1">
                        <el-popconfirm width="180" confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled"
                            icon-color="red" title="确定取消预约吗?" @confirm="cancelOrder">
                            <template #reference>
                                <el-button>取消预约</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button type="primary" v-if="orderInfo.orderStatus == 0" @click="openDialog">支付</el-button>
                    </div>
                </div>
                <div class="right">
                    <el-card class="box-card">
                        <template #header>
                            <div>
                                <span>注意事项</span>
                            </div>
                        </template>
                        <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
                        <p style="color:red;">2.【取号】就诊当天需在{{ orderInfo.fetchTime }}在医院取号，未取号视为爽约，该号不退不换；</p>
                        <p>3.【退号】在{{ orderInfo.quitTime }}前可在线退号，逾期将不可办理退号退费；</p>
                        <p>4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；</p>
                        <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                    </el-card>
                </div>
            </div>
        </el-card>
        <el-dialog v-model="dialogVisible" title="微信支付" width="500" @close="closeDialog">
            <div class="qrcode">
                <img :src="imgUrl" alt="">
                <p>请使用微信扫一扫</p>
                <p>扫描二维码支付</p>
            </div>
            <template #footer>
                <el-button @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { InfoFilled } from '@element-plus/icons-vue'
//@ts-ignore
import QRCode from 'qrcode'
import { reqOrderInfo, reqCancelOrder,reqQrcode,reqPayStatus } from '@/api/user'
import { OrderInfoResponseData } from '@/api/user/type'
import { ElMessage } from 'element-plus'
export default defineComponent({
    name: 'Detail',
    setup() {
        onMounted(() => {
            getOrderInfo()
        })
        const $route = useRoute()
        const orderInfo = ref<any>({})
        const getOrderInfo = async () => {
            const result: OrderInfoResponseData = await reqOrderInfo($route.query.orderId as string)
            if (result.code == 200) {
                orderInfo.value = result.data
            }
        }
        const cancelOrder = async () => {
            const result = await reqCancelOrder($route.query.orderId as string)
            if (result.code == 200) {
                getOrderInfo()
            } else {
                ElMessage({
                    type: 'error',
                    message: result.message
                })
            }
        }
        const dialogVisible = ref<boolean>(false)
        const imgUrl=ref<string>('')
        const payTimer=ref<any>()
        const openDialog = async () => {
            dialogVisible.value = true
            const result=await reqQrcode($route.query.orderId as string)
            imgUrl.value=await QRCode.toDataURL(result.data.codeUrl)
            payTimer.value=setInterval(async ()=>{
                const result=await reqPayStatus($route.query.orderId as string)
                console.log(result);
                
                if(result.data){
                    dialogVisible.value=false
                    clearInterval(payTimer.value)
                    ElMessage({
                        type:'success',
                        message:result.message
                    })
                    getOrderInfo()
                }
            },2000)
            
        }
        const closeDialog=()=>{
            dialogVisible.value=false
            clearInterval(payTimer.value)
        }
        return {
            orderInfo,
            InfoFilled,
            cancelOrder,
            dialogVisible,
            openDialog,
            closeDialog,
            imgUrl
        }
    }
})
</script>
<style lang="scss" scoped>
.box-card {
    margin-top: 20px;
    .detail {
        color: #7f7f7f;
        font-weight: 900;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;

        .tag {
            display: flex;
            align-items: center;

            span {
                margin-left: 5px;
            }
        }

        .right_info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 40px;
            }

            .info {
                font-size: 12px;
                line-height: 20px;
                margin-left: 10px;

                p {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }

    .bottom {
        display: flex;
        margin-top: 20px;

        .left {
            flex: 4;

            .btn {
                margin: 10px 0;
            }
        }

        .right {
            margin-left: 20px;
            flex: 6;
            font-size: 14px;
            line-height: 30px;
        }
    }
}

:deep(.el-dialog__body) {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}
.qrcode{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 256px;
    }
    p{
        line-height: 20px;
    }
}
</style>