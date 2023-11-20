<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级：</div>
            <ul class="right">
                <li :class="{active:activeFlag===''}" @click="changeLevel('')">全部</li>
                <li v-for="level in levelArr" :key="level.value" 
                :class="{active:activeFlag===level.value}"
                @click="changeLevel(level.value)">{{level.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent,onMounted,ref} from 'vue'
import { reqHospitalLevelAndRegion } from '@/api/home'
import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from '@/api/home/type'
export default defineComponent({
    name:'Level',
    setup(props,{emit}){
        const levelArr=ref<HospitalLevelAndRegionArr>([])
        const activeFlag=ref<string>('')
        const getLevel=async ()=>{
            const result:HospitalLevelAndRegionResponseData=await reqHospitalLevelAndRegion('HosType')
            if(result.code===200){
                levelArr.value=result.data
            }
        }
        const changeLevel=(level:string)=>{
            activeFlag.value=level
            emit('getLevel',level)
        }
        onMounted(getLevel)
        return {
            levelArr,
            activeFlag,
            changeLevel
        }
    }
})
</script>
<style lang="scss" scoped>
.level{
    color: #7f7f7f;
    h1{
        font-weight: 900;
        margin: 10px 0;
    }
    .content{
        display: flex;
        .left{
            flex-shrink: 0;
            margin-right: 10px;
        }
        .right{
            display: flex;
            li{
                margin-right: 15px;
                &.active{
                    color: #55a6fe;
                }
                &:hover{
                    color: #55a6fe;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>