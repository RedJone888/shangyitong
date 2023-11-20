<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>就诊人管理</span>
                <el-button type="primary" :icon="User" @click="changeScene">添加就诊人</el-button>
            </div>
        </template>
        <div class="visitors" v-if="scene == 0">
            <Visitor @changeScene="updateChangeScene" @removeVisitor="fetchVisitorList" v-for="visitor in visitorListArr" :key="visitor.id" :visitor="visitor" class="item" />
        </div>
        <div class="form" v-else>
            <el-divider content-position="left">就诊人信息</el-divider>
            <el-form ref="basicInfo" style="width: 60%; margin: 10px auto;" label-width="90" :model="visitorParams" :rules="rules">
                <el-form-item label="用户姓名" prop="name">
                    <el-input placeholder="请输入用户姓名"  v-model="visitorParams.name"/>
                </el-form-item>
                <el-form-item label="证件类型" prop="certificatesType">
                    <el-select placeholder="请选择证件类型" style="width: 100%;" v-model="visitorParams.certificatesType">
                        <el-option :label="certification.name" :value="certification.value"
                        v-for="certification in certificationArr" :key="certification.id"  />
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="certificatesNo">
                    <el-input placeholder="请输入证件号码"  v-model="visitorParams.certificatesNo" />
                </el-form-item>
                <el-form-item label="用户性别" prop="sex">
                    <el-radio-group v-model="visitorParams.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthdate">
                    <el-date-picker type="date" placeholder="请选择日期" value-format="YYYY-MM-DD"
                    v-model="visitorParams.birthdate"/>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input placeholder="请输入手机号码" v-model="visitorParams.phone" />
                </el-form-item>
            </el-form>
            <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
            <el-form ref="moreInfo" style="width: 60%; margin: 10px auto;" label-width="90" :model="visitorParams" :rules="rules">
                <el-form-item label="婚姻状况" prop="isMarry">
                    <el-radio-group v-model="visitorParams.isMarry">
                        <el-radio :label="1">已婚</el-radio>
                        <el-radio :label="0">未婚</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="自费/医保" prop="isInsure">
                    <el-radio-group v-model="visitorParams.isInsure">
                        <el-radio :label="1">自费</el-radio>
                        <el-radio :label="0">医保</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="当前住址" prop="addressSelected">
                    <el-cascader :props="props" v-model="visitorParams.addressSelected" />
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input placeholder="请输入用户详细地址" v-model="visitorParams.address"/>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">联系人信息（选填）</el-divider>
            <el-form style="width: 60%; margin: 10px auto;" label-width="90">
                <el-form-item label="联系人姓名">
                    <el-input placeholder="请输入联系人姓名" v-model="visitorParams.contactsName"/>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select placeholder="请选择证件类型" style="width: 100%;" v-model="visitorParams.contactsCertificatesType">
                        <el-option :label="certification.name" :value="certification.value"
                        v-for="certification in certificationArr" :key="certification.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input placeholder="请输入证件号码" v-model="visitorParams.contactsCertificatesNo"/>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请输入手机号码" v-model="visitorParams.contactsPhone"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button type="primary" @click="resetvisitorParams">重写</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref,reactive,watch } from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {ElMessage,type CascaderProps} from 'element-plus'
import { User } from '@element-plus/icons-vue'
import { reqVisitorList } from '@/api/hospital'
import type { VisitorArr, VisitorListResponseData } from '@/api/hospital/type'
import {reqCertificationType,reqCity,reqAddOrUpadateVisitor} from '@/api/user'
import type {
    CertificationTypeArr,
    CertificationTypeResponseData,
    CityResponseData,
    AddOrUpdateVisitor
} from '@/api/user/type'
export default defineComponent({
    name: 'Patient',
    setup() {
        const $route =useRoute()
        const $router =useRouter()
        onMounted(() => {
            if($route.query.type){
                scene.value=1
            }
            fetchVisitorList()
            getCertificationType()
        })
        const visitorListArr = ref<VisitorArr>([])
        watch(()=>visitorListArr.value,(value)=>{
            if($route.query.type=='edit'){
                const user=value.find((item:any)=>item.id==$route.query.id)
                Object.assign(visitorParams,user)
            }
        })
        const fetchVisitorList = async () => {
            const result: VisitorListResponseData = await reqVisitorList()
            if (result.code == 200) {
                visitorListArr.value = result.data
            }
        }
        const scene = ref<number>(0)
        const changeScene = () => {
            resetvisitorParams()
            scene.value = 1
        }
        const updateChangeScene=(visitor:AddOrUpdateVisitor)=>{
            scene.value=1
            Object.assign(visitorParams,visitor)
        }
        const certificationArr = ref<CertificationTypeArr>([])
        const getCertificationType = async () => {
            const result: CertificationTypeResponseData = await reqCertificationType()
            if (result.code == 200) {
                certificationArr.value = result.data
            }
        }
        const props: CascaderProps = {
            lazy: true,
            async lazyLoad(node, resolve) {
                const result: CityResponseData = await reqCity(node.data?.id as string || '86')
                const showData = result.data.map(item => ({
                    id: item.id,
                    value: item.value,
                    label: item.name,
                    leaf: !item.hasChildren
                }))
                resolve(showData)
            },
        }
        const visitorParams = reactive<AddOrUpdateVisitor>({
            name: '',
            certificatesType: '',
            certificatesNo: '',
            sex: 1,
            birthdate: '',
            phone: '',
            isMarry: 1,
            isInsure: 1,
            addressSelected: [],
            address: '',
            contactsName: '',
            contactsCertificatesType: '',
            contactsCertificatesNo: '',
            contactsPhone: ''
        })
        const validatorName=(_:any,value:any,callBack:any)=>{
            const reg=/^[\u4e00-\u9fa5]{1,2}(·[\u4e00-\u9fa5]{1,2})*[\u4e00-\u9fa5]{1,2}$/
            if(reg.test(value)){
                callBack()
            }else{
                callBack(new Error('请输入中文名'))
            }
        }
        const validatorNo=(_:any,value:any,callBack:any)=>{
            const reg=/^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[Xx\d]$/
            if(reg.test(value)){
                callBack()
            }else{
                callBack(new Error('请输入18位正确格式的身份证号码'))
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
        const rules={
            name: [{required:true,validator:validatorName}],
            certificatesType: [{required:true,message:'请选择证件类型'}],
            certificatesNo: [{required:true,validator:validatorNo}],
            sex: [{required:true,message:'请选择性别'}],
            birthdate: [{required:true,message:'请选择出生日期'}],
            phone: [{required:true,validator:validatorPhone}],
            isMarry: [{required:true,message:'请选择婚姻状况'}],
            isInsure: [{required:true,message:'请选择自费或医保'}],
            addressSelected: [{required:true,message:'请选择当前住址'}],
            address: [{required:true,message:'请输入详细地址'}],
        }
        const basicInfo=ref()
        const moreInfo=ref()
        const submit = async () => {
            await basicInfo.value.validate()
            await moreInfo.value.validate()
            try {
                await reqAddOrUpadateVisitor(visitorParams)
                ElMessage({
                    type: 'success',
                    message: visitorParams.id ? '修改成功' : '新增成功'
                })
                if($route.query.type){
                    $router.back()
                }else{
                    scene.value = 0
                    fetchVisitorList()
                }
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: visitorParams.id ? '修改失败' : '新增失败'
                })

            }
        }
        const resetvisitorParams = () => {
            Object.assign(visitorParams, {
                id:null,
                name: '',
                certificatesType: '',
                certificatesNo: '',
                sex: 1,
                birthdate: '',
                phone: '',
                isMarry: 1,
                isInsure: 1,
                addressSelected: [],
                address: '',
                contactsName: '',
                contactsCertificatesType: '',
                contactsCertificatesNo: '',
                contactsPhone: ''
            })
        }
        return {
            User,
            fetchVisitorList,
            visitorListArr,
            scene,
            changeScene,
            updateChangeScene,
            certificationArr,
            props,
            visitorParams,
            rules,
            submit,
            basicInfo,
            moreInfo,
            resetvisitorParams
        }
    }
})
</script>
<style lang="scss" scoped>
.box-card {
    margin-top: 20px;

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
</style>