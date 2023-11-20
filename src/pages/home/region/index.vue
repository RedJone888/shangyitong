<template>
    <div class="region">
        <div class="content">
            <div class="left">地区：</div>
            <ul class="right">
                <li :class="{active:regionFlag===''}" @click="changeFlag('')">全部</li>
                <li v-for="region in RegionArr" :key="region.value"
                :class="{active:regionFlag===region.value}"
                @click="changeFlag(region.value)">{{region.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent,onMounted,ref } from 'vue'
import { reqHospitalLevelAndRegion } from '@/api/home'
import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from '@/api/home/type'
export default defineComponent({
    name: 'Region',
    setup(props,{emit}) {
        const RegionArr=ref<HospitalLevelAndRegionArr>([])
        const regionFlag=ref<string>('')
        const getRegion=async ()=>{
            const result:HospitalLevelAndRegionResponseData=await reqHospitalLevelAndRegion('Beijin')
            if(result.code===200){
                RegionArr.value=result.data
            }
        }
        const changeFlag=(region:string)=>{
            regionFlag.value=region
            emit('getRegion',region)
        }
        onMounted(getRegion)
        return {
            RegionArr,
            regionFlag,
            changeFlag
        }
    }
})
</script>
<style lang="scss" scoped>
.region {
    color: #7f7f7f;
    margin-top: 10px;
    .content{
        display: flex;
        .left {
            flex-shrink: 0;
            margin-right: 10px;
        }

        .right{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: 15px;
                margin-bottom: 15px;
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