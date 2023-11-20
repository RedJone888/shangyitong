<template>
    <div class="login_container">
        <el-dialog v-model="userStore.visiable" title="用户登录">
            <el-row>
                <el-col :span="12">
                    <div class="login">
                        <div class="phone" v-show="scene == 0">
                            <el-form :model="loginParam" :rules="rules" ref="phoneCodeForm">
                                <el-form-item prop="phone">
                                    <el-input placeholder="请输入手机号码" :prefix-icon="User"
                                        v-model="loginParam.phone"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input placeholder="请输入手机验证码" :prefix-icon="Lock"
                                        v-model="loginParam.code"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone || countDownFlag" @click="getCode">获取验证码<span
                                            v-show="countDownFlag">({{ countDownTime }}s)</span></el-button>
                                </el-form-item>
                            </el-form>
                            <el-button type="primary" style="width: 100%;" :disabled="!isPhone || loginParam.code.length != 6"
                                @click="login">用户登录</el-button>
                            <div class="bottom" @click="changeScene">
                                <p>微信扫码登录</p>
                                <svg t="1699519251985" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4078" width="32" height="32">
                                    <path
                                        d="M747.685 397.746a278.056 278.056 0 0 0-55.663-10.097c0.176-1.383 0.254-2.817-0.055-4.25C666.6 265.125 539.421 175.961 396.108 175.961c-161.945 0-293.707 112.922-293.707 251.727 0 74.469 38.016 141.566 110.055 194.48l-25.114 75.496a12.855 12.855 0 0 0 3.762 13.723 12.894 12.894 0 0 0 8.399 3.121c1.945 0 3.918-0.461 5.734-1.355l94.285-47.184 11.621 2.355c29.031 5.965 54.094 11.137 84.965 11.137 9.09 0 18.305-0.41 27.344-1.176 3.66-0.308 6.758-2.152 8.855-4.812 33.996 85.066 127.696 146.48 237.953 146.48 28.239 0 56.832-6.808 82.485-13.234l72.676 39.73a12.842 12.842 0 0 0 6.144 1.59c2.867 0 5.734-0.972 8.039-2.843 4.043-3.278 5.707-8.676 4.199-13.618l-18.562-61.722C887.475 720.68 921.6 661.848 921.6 603.278c0-79.944-53.36-151.378-130.419-188.83"
                                        fill="#E7402E" p-id="4079"></path>
                                    <path
                                        d="M831.565 861.039a25.893 25.893 0 0 1-12.383-3.185l-68.22-37.294c-26.957 6.668-53.498 12.393-80.702 12.393-107.302 0-203.612-56.467-244.416-141.856-0.431 0.058-0.865 0.105-1.302 0.142a338.189 338.189 0 0 1-28.434 1.222c-32.084 0-57.661-5.255-87.277-11.34l-7.499-1.52-90.277 45.178c-3.653 1.799-7.621 2.729-11.552 2.729a25.91 25.91 0 0 1-16.87-6.259c-7.923-6.895-10.898-17.722-7.643-27.638l22.182-66.683C126.619 572.375 89.401 503.66 89.401 427.688c0-145.971 137.588-264.727 306.707-264.727 71.959 0 142.854 21.92 199.622 61.722 55.72 39.067 93.846 92.538 107.82 151.018a291.472 291.472 0 0 1 47.747 9.558c6.897 1.995 10.871 9.204 8.876 16.1-1.995 6.897-9.206 10.868-16.101 8.876a265.576 265.576 0 0 0-53.061-9.625 13 13 0 0 1-11.886-14.6c0.017-0.136 0.028-0.241 0.036-0.32-24.34-112.191-145.926-196.729-283.054-196.729-154.782 0-280.707 107.092-280.707 238.727 0 70.04 36.222 133.667 104.751 184.002a13.001 13.001 0 0 1 4.64 14.581l-24.976 75.08 93.889-47.007a13.01 13.01 0 0 1 8.4-1.116l11.96 2.425c28.226 5.8 52.603 10.808 82.044 10.808 8.504 0 17.268-0.375 26.049-1.113a13.026 13.026 0 0 1 12.003-4.732 13.001 13.001 0 0 1 10.218 8.033c33.06 82.724 123.835 138.304 225.881 138.304 25.904 0 52.304-6.076 79.326-12.844a13 13 0 0 1 9.395 1.204l72.213 39.477-18.402-61.19a13 13 0 0 1 4.39-13.944c58.952-46.583 91.418-102.119 91.418-156.378 0-72.358-47.17-140.233-123.102-177.138-6.458-3.139-9.148-10.917-6.009-17.375s10.919-9.146 17.375-6.01c40.504 19.686 74.753 48.274 99.043 82.675 25.313 35.848 38.693 76.599 38.693 117.848 0 60.145-33.449 120.667-94.396 171.192l16.048 53.365c3.055 10.013-0.26 20.811-8.461 27.459a25.82 25.82 0 0 1-16.225 5.745z"
                                        fill="#3D100B" p-id="4080"></path>
                                    <path
                                        d="M501.456 378.43c21.066 0 35.148-14.106 35.148-35.121 0-21.25-14.055-34.996-35.148-34.996-21.098 0-42.266 13.746-42.266 34.996 0.023 21.015 21.195 35.121 42.266 35.121zM304.87 308.313c-21.067 0-42.367 13.746-42.367 34.996 0 21.015 21.3 35.121 42.367 35.121 20.992 0 35.047-14.106 35.047-35.121-0.024-21.25-14.055-34.996-35.047-34.996z"
                                        fill="#F4DD50" p-id="4081"></path>
                                    <path
                                        d="M432.433 683.542c-5.712 0-10.949-3.794-12.531-9.57-4.82-17.602-8.701-53.066-8.701-70.694 0-54.531 23.464-107.561 66.069-149.321 41.292-40.472 97.652-67.752 158.701-76.814 7.102-1.049 13.714 3.849 14.768 10.951 1.054 7.102-3.848 13.714-10.95 14.768-115.494 17.144-202.587 103.304-202.587 200.417 0 15.614 3.662 48.796 7.778 63.827 1.896 6.925-2.18 14.076-9.105 15.972-1.15 0.313-2.306 0.464-3.442 0.464z"
                                        fill="#3D100B" p-id="4082"></path>
                                    <path
                                        d="M259.169 604.143a14.936 14.936 0 0 1-9.213-3.171 264.716 264.716 0 0 1-15.77-13.329c-6.115-5.59-6.54-15.078-0.951-21.192 5.589-6.114 15.077-6.541 21.192-0.951a234.594 234.594 0 0 0 13.976 11.813c6.533 5.094 7.699 14.52 2.605 21.053a14.976 14.976 0 0 1-11.839 5.777zM210.952 554.664a14.977 14.977 0 0 1-12.021-6.014c-27.138-36.265-46.109-79.47-54.863-124.945-1.566-8.135 3.759-15.999 11.894-17.565 8.137-1.57 15.999 3.759 17.565 11.894 7.9 41.041 24.991 79.991 49.424 112.641 4.963 6.633 3.61 16.034-3.022 20.997a14.936 14.936 0 0 1-8.977 2.992z"
                                        fill="#FFFFFF" p-id="4083"></path>
                                    <path
                                        d="M592.796 511.961c-14.055 0-28.11 14.156-28.11 28.188 0 14.129 14.055 28.082 28.11 28.082 21.117 0 35.07-13.953 35.07-28.082 0-14.055-13.953-28.188-35.07-28.188zM747.213 511.961c-13.847 0-27.902 14.156-27.902 28.188 0 14.129 14.055 28.082 27.902 28.082 21.043 0 35.25-13.953 35.25-28.082 0-14.055-14.179-28.188-35.25-28.188z"
                                        fill="#F4DD50" p-id="4084"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="wechat" v-show="scene == 1">
                            <div id="login_container"></div>
                            <div class="bottom" @click="scene = 0">
                                <p>手机短信验证码登录</p>
                                <svg t="1699875569372" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4093" width="16" height="16"><path d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z" p-id="4094" fill="#1296db"></path></svg>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="rightContent">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/images/code_app.png" alt="">
                                <svg t="1699519630238" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4303" width="16" height="16">
                                    <path
                                        d="M692.699238 336.887706c11.619123 0 23.117414 0.831898 34.517504 2.108006C696.19497 194.549965 541.769728 87.227597 365.488742 87.227597 168.405197 87.227597 6.977229 221.535539 6.977229 392.107418c0 98.493235 53.707366 179.306803 143.459123 242.033357l-35.857101 107.840102 125.329408-62.837146c44.84311 8.861798 80.827085 18.002022 125.578138 18.002022 11.250688 0 22.40215-0.561766 33.469645-1.428582-7.001702-23.95351-11.06647-49.054208-11.06647-75.120947C387.891917 463.976243 522.3936 336.887706 692.699238 336.887706zM497.405542 232.406118c30.611456 0 55.425536 24.815206 55.425536 55.427379s-24.814182 55.426355-55.425536 55.426355c-30.613504 0-55.427584-24.815206-55.427584-55.426355S466.794086 232.406118 497.405542 232.406118zM246.567526 344.377344c-30.611456 0-55.427584-24.815206-55.427584-55.426355 0-30.611149 24.81623-55.426355 55.427584-55.426355 30.613504 0 55.428608 24.815206 55.428608 55.426355C301.996134 319.561114 277.18103 344.377344 246.567526 344.377344zM1017.379942 617.455821c0-143.330406-143.423283-260.165325-304.515686-260.165325-170.58089 0-304.924979 116.834918-304.924979 260.165325 0 143.57801 134.34409 260.158157 304.924979 260.158157 35.697459 0 71.712154-9.0112 107.569254-17.99895l98.340659 53.861683-26.969293-89.592525C963.769856 769.897677 1017.379942 698.309222 1017.379942 617.455821zM619.184947 577.275699c-21.799322 0-39.469466-17.673523-39.469466-39.471002 0-21.799526 17.671168-39.468954 39.469466-39.468954s39.469466 17.670451 39.469466 39.468954C658.656563 559.6032 640.983347 577.275699 619.184947 577.275699zM816.270541 579.514675c-21.80137 0-39.47049-17.672499-39.47049-39.468954 0-21.80055 17.670144-39.468954 39.47049-39.468954 21.798298 0 39.469466 17.669427 39.469466 39.468954C855.741133 561.842176 838.068941 579.514675 816.270541 579.514675z"
                                        fill="#272636" p-id="4304"></path>
                                </svg>
                                <p>微信扫一扫关注</p>
                                <p>“快速预约挂号”</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/images/code_login_wechat.png" alt="">
                                <svg t="1699519702841" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="5498" width="16" height="16">
                                    <path
                                        d="M798.723234 174.782745c0-60.576657-49.106418-109.683075-109.683075-109.683075l-354.708628 0c-60.576657 0-109.683075 49.106418-109.683075 109.683075l0 673.980161c0 60.576657 49.106418 109.683075 109.683075 109.683075l354.708628 0c60.576657 0 109.683075-49.106418 109.683075-109.683075L798.723234 174.782745zM264.557398 237.015112l494.256894 0 0 529.049305-494.256894 0L264.557398 237.015112zM334.356091 105.008612 689.016623 105.008612c38.548968 0 69.798692 31.249725 69.798692 69.798692l0 22.298865-494.256894 0 0-22.298865C264.557398 136.25936 295.807123 105.008612 334.356091 105.008612zM689.016623 918.53704 334.356091 918.53704c-38.548968 0-69.798692-31.249725-69.798692-69.798692l0-43.788296 494.256894 0 0 43.788296C758.814292 887.287315 727.564567 918.53704 689.016623 918.53704z"
                                        fill="#272636" p-id="5499"></path>
                                    <path
                                        d="M513.173732 829.943282c-16.70752 0-30.30112 13.5936-30.30112 30.30112 0 16.70752 13.5936 30.30112 30.30112 30.30112s30.299073-13.5936 30.299073-30.30112C543.472805 843.536882 529.881253 829.943282 513.173732 829.943282z"
                                        fill="#272636" p-id="5500"></path>
                                </svg>
                                <p>扫一扫下载</p>
                                <p>“预约挂号”APP</p>
                            </div>
                        </div>
                        <div class="bottom">
                            <p>尚医通官方指定平台</p>
                            <p>快速挂号 安全放心</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <template #footer>
                <el-button type="primary" @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import {reqWxLogin} from '@/api/hospital'
import type {WXLoginResponseData} from '@/api/hospital/type'
export default defineComponent({
    name: 'Login',
    setup() {
        const scene = ref<number>(0)
        const userStore = useUserStore()
        const changeScene = async () => {
            scene.value = 1
            let wxRedirectUri=encodeURIComponent(location.origin+'/wxlogin')
            let result:WXLoginResponseData = await reqWxLogin(wxRedirectUri)
            //@ts-ignore
            new WxLogin({
                self_redirect: true,
                id: "login_container",
                appid: result.data.appid,
                scope: result.data.scope,
                redirect_uri: result.data.redirectUri,
                state: result.data.state,
                style: "black"
            });
        }
        const loginParam = reactive({
            phone: '',
            code: ''
        })
        const isPhone = computed(() => {
            const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
            return reg.test(loginParam.phone)
        })
        const getCode = async () => {
            countDownFlag.value = true
            try {
                await userStore.getCode(loginParam.phone)
                loginParam.code = userStore.smsCode
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: (error as Error).message
                })
            }
        }
        const countDownFlag = ref<boolean>(false)
        const countDownTime = ref<number>(5)
        watch(() => countDownFlag.value, () => {
            let timer = setInterval(() => {
                countDownTime.value--
                if (countDownTime.value <= 0) {
                    clearInterval(timer)
                    countDownFlag.value = false
                    countDownTime.value = 5
                }
            }, 1000)

        })

        const phoneCodeForm = ref<any>()
        const $router=useRouter()
        const $route=useRoute()
        const login = async () => {
            await phoneCodeForm.value.validate()
            try {
                await userStore.userLogin(loginParam)
                userStore.visiable = false
                const redirect=$route.query.redirect
                if(redirect){
                    $router.push(redirect as string)
                }
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: (error as Error).message
                })
            }
        }
        const validatorPhone = (_: any, value: any, callBack: any) => {
            const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
            if (reg.test(value)) {
                callBack()
            } else {
                callBack(new Error('请输入正确的手机号格式'))
            }
        }
        const validatorCode = (_: any, value: any, callBack: any) => {
            if (/^\d{6}$/.test(value)) {
                callBack()
            } else {
                callBack(new Error('请输入正确的验证码格式'))
            }
        }
        const rules = {
            phone: [
                { validator: validatorPhone, trigger: 'change' }
            ],
            code: [
                { validator: validatorCode, trigger: 'change' }
            ]
        }
        const closeDialog = () => {
            userStore.visiable = false
        }
        watch(()=>scene.value,(val:number)=>{
            if(val===1){
                userStore.queryState()
            }
        })
        return {
            userStore,
            User,
            Lock,
            scene,
            changeScene,
            loginParam,
            isPhone,
            getCode,
            countDownFlag,
            countDownTime,
            login,
            rules,
            phoneCodeForm,
            closeDialog
        }
    }
})
</script>
<style lang="scss" scoped>
.login_container {
    :deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .login {
        padding: 20px;
        border-radius: 5px;
        border: 1px solid #ccc;

        .bottom {
            display: flex;
            flex-direction: column;
            align-items: center;

            p {
                margin-top: 15px;
            }
        }
        .wechat{
            display: flex;
            flex-direction: column;
            align-items: center;
            .bottom{
                p{
                    margin: 15px 0 10px;
                }
            }
        }

    }

    .rightContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 130px;
                    margin-bottom: 10px;
                }

                p {
                    font-size: 12px;
                    margin-top: 10px;
                }
            }
        }

        .bottom {
            margin-top: 40px;
            text-align: center;
            font-size: 20px;
            font-weight: 900;

            p {
                margin: 20px 0;
            }
        }
    }
}</style>