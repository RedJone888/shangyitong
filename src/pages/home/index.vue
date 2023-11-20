<template>
    <div>
        <Carousel />
        <Search />
        <el-row :gutter="20">
            <el-col :span="20">
                <Level @getLevel="getLevel"/>
                <Region @getRegion="getRegion"/>
                <div class="hospital" v-if="hasHospitalArr.length">
                    <Card class="item" v-for="item in hasHospitalArr" :key="item.id" :hospitalInfo="item" />
                </div>
                <el-empty v-else description="暂无数据" />
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                    :background="true" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
                    @current-change="getHospitalInfo" @size-change="getHospitalInfo" />
            </el-col>
            <el-col :span="4">
            <Tip/>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

import { reqHospital } from '@/api/home'

import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'
import Tip from './tip/index.vue'

import type {Content,HospitalResponseData} from '@/api/home/type'

export default defineComponent({
    name: 'Home',
    components: { Carousel, Search, Level, Region, Card,Tip },
    setup() {
        const pageNo = ref<number>(1)
        const pageSize = ref<number>(10)
        const hostype=ref<string>('')
        const districtCode=ref<string>('')
        const hasHospitalArr = ref<Content>([])
        const total = ref<number>(0)
        const getHospitalInfo = async () => {
            const result:HospitalResponseData = await reqHospital(pageNo.value, pageSize.value,hostype.value,districtCode.value)
            if (result.code === 200) {
                hasHospitalArr.value = result.data.content
                total.value = result.data.totalElements
            }
        }
        const getLevel=(level:string)=>{
            hostype.value=level
            getHospitalInfo()
        }
        const getRegion=(region:string)=>{
            districtCode.value=region
            getHospitalInfo()
        }

        onMounted(() => {
            getHospitalInfo()
        })
        return {
            pageNo, pageSize,hostype,districtCode,
            hasHospitalArr, total,
            getHospitalInfo,
            getLevel,
            getRegion
        }
    }
})
</script>
<style lang="scss" scoped>
.hospital {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 48%;
        margin: 10px 0;
    }
}
</style>