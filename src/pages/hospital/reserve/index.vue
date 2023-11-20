<template>
    <div class="reserve">
        <div class="top">
            <div class="title">{{ detailStore.hospitalDetailInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1699349208118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4029" width="16" height="16">
                    <path
                        d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                        p-id="4030" fill="#d81e06"></path>
                </svg>
                <span>{{ detailStore.hospitalDetailInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <img ref="leftImg" src="" alt="">
            </div>
            <div class="right">
                <div class="label">挂号规则</div>
                <div class="item">
                    预约周期:{{ detailStore.hospitalDetailInfo.bookingRule?.cycle }}天 放号时间:{{
                        detailStore.hospitalDetailInfo.bookingRule?.releaseTime }} 停挂时间:{{
        detailStore.hospitalDetailInfo.bookingRule?.stopTime }}
                </div>
                <div class="item">
                    具体地址:{{ detailStore.hospitalDetailInfo.hospital?.param.fullAddress }}
                </div>
                <div class="item">
                    规划路线:{{ detailStore.hospitalDetailInfo.hospital?.route }}
                </div>
                <div class="item">
                    退号时间:就诊前{{ detailStore.hospitalDetailInfo.bookingRule?.quitDay }}工作日{{
                        detailStore.hospitalDetailInfo.bookingRule?.quitTime }}前取消
                </div>
                <div class="label">医院预约规则</div>
                <ol>
                    <li class="item" v-for="(rule, index) in detailStore.hospitalDetailInfo.bookingRule?.rule" :key="index">
                        {{ rule }}
                    </li>
                </ol>
            </div>
        </div>
        <div class="department">
            <div class="leftNav">
                <ul>
                    <li @click="changeIndex(index)" :class="{ active: index === currentIndex }"
                        v-for="(deparment, index) in detailStore.hospitalDepartmentArr" :key="deparment.depcode">
                        {{ deparment.depname }}</li>
                </ul>
            </div>
            <div class="rightDepartment" ref="rightDepartment" @scroll="changeSrollIndex">
                <div class="showDepartment" v-for="deparment in detailStore.hospitalDepartmentArr" :key="deparment.depcode">
                    <h1 :ref="getAllH1">{{ deparment.depname }}</h1>
                    <ul>
                        <li @click="showLogin(item)" v-for="item in deparment.children" :key="item.depcode">{{ item.depname }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch, nextTick } from 'vue'
import useDetailStore from '@/store/modules/hospitalDetail';
import { useRouter,useRoute } from 'vue-router';
// import useUserStore from '@/store/modules/user';
export default defineComponent({
    name: 'Reserve',
    setup() {
        const detailStore = useDetailStore()

        const allH1 = ref<HTMLElement[]>([])
        const rightDepartment = ref<any>(null)
        const getAllH1 = el => {
            if (el) {
                allH1.value.push(el)
            }
        }

        const allH1InitOffsetTop = ref<number[]>([])
        const rightOffsetTop = ref<number>(0)
        const allH1ScrollTop = ref<number[]>([])

        const getAllH1ScrollTop = () => {
            allH1InitOffsetTop.value = allH1.value.map((itemH1: HTMLElement) => itemH1.offsetTop)
            rightOffsetTop.value = rightDepartment.value.offsetTop
            allH1ScrollTop.value = allH1InitOffsetTop.value.map(itemH1 => itemH1 - rightOffsetTop.value)
        }
        onMounted(() => {
            nextTick(() => {
                getAllH1ScrollTop()
            })
        })
        watch(() => detailStore.hospitalDepartmentArr, () => {
            nextTick(() => {
                getAllH1ScrollTop()
            })
        })
        const leftImg=ref()
        watch(()=>detailStore.hospitalDetailInfo,(value)=>{
            leftImg.value.src=`data:image/jpeg;base64,${value.hospital.logoData}`
        })

        const currentIndex = ref<number>(0)
        const rightTop = ref<number>(0)
        const clickFlag = ref(false)
        const changeIndex = (index: number) => {
            clickFlag.value = true
            currentIndex.value = index
            rightTop.value = allH1InitOffsetTop.value[currentIndex.value] - rightOffsetTop.value
            rightDepartment.value.scrollTo({
                top: rightTop.value,
                behavior: 'smooth'
            })
        }

        let timer:number
        const changeSrollIndex = () => {
            cancelAnimationFrame(timer);
            timer=requestAnimationFrame(() => {
                if (rightDepartment.value.scrollTop === rightTop.value) {
                    clickFlag.value = false
                }
            })
            if (!clickFlag.value) {
                let scrollTop: number = rightDepartment.value.scrollTop
                let index = allH1ScrollTop.value.findIndex((item, index, arr) => scrollTop >= item && (arr[index + 1] ? scrollTop < arr[index + 1] : true))
                currentIndex.value = index
            }
        }

        const $router=useRouter()
        const $route=useRoute()
        const showLogin=(item:any)=>{
            $router.push({
                path:'/hospital/reserve_step1',
                query:{
                    hoscode:$route.query.hoscode,
                    depcode:item.depcode
                }
            })
        }
        return {
            detailStore,
            currentIndex,
            changeIndex,
            changeSrollIndex,
            rightDepartment,
            getAllH1,
            showLogin,
            leftImg
        }
    }
})
</script>
<style lang="scss" scoped>
.reserve {
    .top {
        display: flex;

        .title {
            font-size: 30px;
            font-weight: 900;
        }

        .level {
            display: flex;
            align-items: center;
            margin-left: 10px;
            color: #7f7f7f;

            span {
                margin-left: 5px;
            }
        }
    }

    .content {
        display: flex;
        margin-top: 20px;

        .left {
            width: 80px;

            img {
                width: 100%;
                border-radius: 50%;
            }
        }

        .right {
            flex: 1;
            margin-left: 10px;

            .label {
                margin: 10px 0;
            }

            .item {
                margin-top: 10px;
                color: #7f7f7f;
            }
        }
    }

    .department {
        display: flex;
        width: 100%;
        height: 500px;
        margin-top: 20px;

        .leftNav {
            width: 80px;
            height: 100%;

            ul {
                width: 100%;
                height: 100%;
                background-color: rgb(248, 248, 248);
                display: flex;
                flex-direction: column;

                li {
                    flex: 1;
                    text-align: center;
                    color: #7f7f7f;
                    font-size: 14px;
                    line-height: 40px;

                    &.active {
                        border-left: 1px solid red;
                        color: red;
                        background-color: #fff;
                    }
                }
            }

        }

        .rightDepartment {
            height: 100%;
            overflow: auto;
            flex: 1;
            margin-left: 20px;

            &::-webkit-scrollbar {
                display: none;
            }

            .showDepartment {
                font-size: 14px;

                h1 {
                    background-color: rgb(248, 248, 248);
                    color: #7f7f7f;
                    line-height: 40px;
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    color: #7f7f7f;

                    li {
                        width: 33%;
                        line-height: 30px;
                    }
                }
            }
        }
    }
}
</style>