<template>
    <div class="wrap">
        <div class="top">
            <div class="hosname">{{workData.baseMap?.hosname}}</div>
            <div class="line"></div>
            <div>{{workData.baseMap?.bigname}}</div>
            <div class="dot">·</div>
            <div class="hosdepartment">{{workData.baseMap?.depname}}</div>
        </div>
        <div class="center">
            <h1 class="time">{{workData.baseMap?.workDateString}}</h1>
            <div class="container">
                <div class="item" 
                :class="{active:bookingSchedule.status==-1||bookingSchedule.availableNumber==-1,cur:bookingSchedule.workDate==workTime.workDate}" 
                v-for="(bookingSchedule,index) in workData.bookingScheduleList" :key="index"
                @click="changeWorkTime(bookingSchedule)">
                    <div class="item-top">{{bookingSchedule.workDate}} {{ bookingSchedule.dayOfWeek }}</div>
                    <div class="item-bottom">
                        <div v-if="bookingSchedule.status==-1">停止挂号</div>
                        <div v-else-if="bookingSchedule.status==0">
                            {{ bookingSchedule.availableNumber==-1?'无号':`有号(${bookingSchedule.availableNumber})` }}
                        </div>
                        <div v-else>即将放号</div>
                    </div>
                </div>
            </div>
            <el-pagination layout="prev, pager, next" :total="workData.total" v-model:current-page="page" @current-change="fetchWorkData"/>
        </div>
        <div class="bottom">
            <div class="will" v-if="workTime.status==1">
                <span class="time">2023.11.20</span>
                <span class="willText">放号</span>
            </div>
            <div class="doctor" v-else>
                <div class="half">
                    <div class="tip">
                        <svg t="1699948871344" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5648" width="32" height="32"><path d="M344.189719 297.542353l-57.889397-57.889397-48.231443 48.232466 57.889397 57.889397L344.189719 297.542353zM254.129654 480.812217l-96.462886 0L157.666768 545.103411l96.462886 0L254.129654 480.812217zM543.518311 162.503932l-64.291194 0 0 93.214915 64.291194 0L543.518311 162.503932zM784.677572 287.885422l-48.231443-48.232466-57.89042 57.889397 45.031568 45.027474L784.677572 287.885422zM678.555709 728.42137l57.89042 57.841302 45.07557-44.982449-57.934423-57.885304L678.555709 728.42137zM768.614751 545.103411l96.464932 0 0-64.291194-96.464932 0L768.614751 545.103411zM511.397785 320.009018c-106.116747 0-192.926795 86.855073-192.926795 192.927818 0 106.113677 86.810048 192.923725 192.926795 192.923725 106.11777 0 192.923725-86.810048 192.923725-192.923725C704.32151 406.864091 617.515555 320.009018 511.397785 320.009018M479.227117 863.459791l64.291194 0 0-93.259941-64.291194 0L479.227117 863.459791zM238.068879 738.030205l48.231443 48.231443 57.889397-57.841302-44.982449-45.027474L238.068879 738.030205z" fill="#1296db" p-id="5649"></path></svg>
                        <span>上午号源</span>
                    </div>
                    <div class="doc_info" v-for="docWork in morningDoctorWork" :key="docWork.id">
                        <div class="left">
                            <div class="info">
                                <span>{{docWork.title}}</span>
                                <span>｜</span>
                                <span>{{docWork.docname}}</span>
                            </div>
                            <div class="skill">{{docWork.skill}}</div>
                        </div>
                        <div class="right">
                            <div class="money">¥{{docWork.amount}}</div>
                            <el-button type="primary" @click="goStep2(docWork)">剩余{{ docWork.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
                <div class="half">
                    <div class="tip">
                        <svg t="1699950209241" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7076" width="32" height="32"><path d="M347.91 676.09c0.22-90.62 73.87-163.9 164.49-163.68 90.31 0.22 163.46 73.37 163.68 163.68H347.91z m-164.08 82.04h656.35c22.66 0.11 40.93 18.57 40.82 41.22-0.11 22.5-18.32 40.71-40.82 40.82H183.83c-22.66-0.11-40.93-18.57-40.82-41.22 0.11-22.5 18.32-40.71 40.82-40.82z" fill="#1296db" p-id="7077"></path><path d="M819.66 553.02h61.53c33.98-0.14 61.64 27.3 61.78 61.28 0.14 33.98-27.3 61.64-61.28 61.78h-62.03c-33.98-0.14-61.42-27.8-61.28-61.78 0.14-33.78 27.49-61.14 61.28-61.28zM678.57 383.66l43.51-43.51c24.03-24.03 62.99-24.03 87.02 0 24.03 24.03 24.03 62.99 0 87.02l-43.51 43.51c-24.14 23.92-63.1 23.74-87.02-0.39-23.76-23.99-23.76-62.65 0-86.63zM142.81 553.02h61.53c33.98 0.14 61.42 27.8 61.28 61.78-0.14 33.79-27.49 61.15-61.28 61.28h-61.53c-33.98 0.14-61.64-27.3-61.78-61.28s27.3-61.64 61.28-61.78h0.5zM512 204.34c33.98 0 61.53 27.55 61.53 61.53v61.53c-0.14 33.98-27.8 61.42-61.78 61.28-33.79-0.14-61.15-27.49-61.28-61.28v-61.53c0-33.98 27.55-61.53 61.53-61.53zM217.08 340.15c24.03-24.03 62.99-24.03 87.02 0l43.51 43.51c23.96 24.1 23.84 63.06-0.26 87.02-24 23.86-62.76 23.85-86.76 0l-43.51-43.51c-24.17-23.89-24.65-62.59-0.76-86.76 0.17-0.18 0.34-0.35 0.76-0.26z" fill="#1296db" opacity=".3" p-id="7078"></path></svg>
                        <span>下午号源</span>
                    </div>
                    <div class="doc_info" v-for="docWork in afternoonDoctorWork" :key="docWork.id">
                        <div class="left">
                            <div class="info">
                                <span>{{docWork.title}}</span>
                                <span>｜</span>
                                <span>{{docWork.docname}}</span>
                            </div>
                            <div class="skill">{{docWork.skill}}</div>
                        </div>
                        <div class="right">
                            <div class="money">¥{{ docWork.amount }}</div>
                            <el-button type="primary" @click="goStep2(docWork)">剩余{{docWork.availableNumber}}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent,ref,onMounted, computed} from 'vue'
import { useRoute,useRouter } from 'vue-router'
import {reqHospitalWork,reqHospitalDoctor} from '@/api/hospital'
import type {
    HospitalWorkResponseData,
    HospitalDoctorResponseData,
    WorkData,
    DoctorWorkArr,
    DoctorWork
} from '@/api/hospital/type'
export default defineComponent({
    name:'ReseveStepOne',
    setup(){
        const page=ref<number>(1)
        const limit=ref<number>(6)
        const $route=useRoute()
        const $router=useRouter()
        const workData=ref<any>({
            total:0
        })
        const workTime=ref<any>({})
        const doctorWorkArr=ref<DoctorWorkArr>([])
        const fetchWorkData=async ()=>{
            const result:HospitalWorkResponseData= await reqHospitalWork(page.value,limit.value,$route.query.hoscode as string,$route.query.depcode as string)
            if(result.code==200){
                workData.value=result.data
                workTime.value=workData.value.bookingScheduleList[0]
                getDoctorWorkData()
                
            }
        }
        const getDoctorWorkData=async ()=>{
            const result:HospitalDoctorResponseData= await reqHospitalDoctor($route.query.hoscode as string, $route.query.depcode as string, workTime.value.workDate)
            if(result.code==200){
                doctorWorkArr.value=result.data
            }
        }
        const changeWorkTime=(item:WorkData)=>{
            workTime.value=item
            getDoctorWorkData()
        }
        const morningDoctorWork=computed(()=>{
            return doctorWorkArr.value.filter(doc=>doc.workTime==0)
        })
        const afternoonDoctorWork=computed(()=>{
            return doctorWorkArr.value.filter(doc=>doc.workTime==1)
        })
        onMounted(() => {
            fetchWorkData()
        })
        const goStep2=(docWork:DoctorWork)=>{
            $router.push({path:'/hospital/reserve_step2',query:{scheduleId:docWork.id}})
        }
        return {
            page,
            fetchWorkData,
            workData,
            changeWorkTime,
            workTime,
            morningDoctorWork,
            afternoonDoctorWork,
            goStep2
        }
    }
})
</script>
<style lang="scss" scoped>
.wrap{
    .top{
        display: flex;
        color:#7f7f7f;
        .line{
            width: 1px;
            height: 18px;
            background-color: #7f7f7f;
            margin: 0 5px;
        }
        .dot{
            margin: 0 5px;
        }
    }
    .center{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0;
        .time{
            font-weight: 900;
        }
        .container{
            width: 100%;
            display: flex;
            margin: 30px 0;
            .item{
                flex: 1;
                border: 1px solid skyblue;
                margin: 0 5px;
                transition: all .5s;
                &.active{
                    border: 1px solid #ccc;
                    color: #7f7f7f;
                    .item-top{
                        background-color: #ccc;
                    }
                }
                &.cur{
                    transform: scale(1.1);
                }
                .item-top{
                    background-color: #e8f2ff;
                    line-height: 30px;
                    text-align: center;
                }
                .item-bottom{
                    line-height: 60px;
                    text-align: center;
                }
            }
        }
    }
    .bottom{
        .will{
            text-align: center;
            font-size: 30px;
            font-weight: 900;
            .time{
                color: skyblue;
            }
            .willText{
                color: blue;
            }
        }
        .doctor{
            .half{
                margin: 20px 0;
                .tip{
                    display: flex;
                    align-items: center;
                    color: #7f7f7f;
                    font-weight: 900;
                }
                .doc_info{
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;
                    border-bottom: 1px solid #ccc;
                    .left{
                        .info{
                            color: blue;
                            font-size: 18px;
                            font-weight: 900;
                            margin: 10px 0;
                        }
                        .skill{
                            color: #7f7f7f;
                            margin: 10px 0;
                        }
                    }
                    .right{
                        width: 150px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .money{
                            color: #7f7f7f;
                            font-weight: 900;
                        }
                    }
                }
            }
        }

    }
}
</style>