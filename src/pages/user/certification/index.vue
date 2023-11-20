<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <h1>实名信息</h1>
            </div>
        </template>
        <div class="tip">
            <el-icon>
                <InfoFilled />
            </el-icon>
            <p>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</p>
        </div>
        <el-descriptions v-if="userInfo.authStatus == 1" class="margin-top" :column="1" border>
            <el-descriptions-item label="用户姓名" label-align="center">
               {{ userInfo.name }}
            </el-descriptions-item>
            <el-descriptions-item label="证件类型" label-align="center">
                {{userInfo.certificatesType=='10'?'身份证':'户口本'}}
            </el-descriptions-item>
            <el-descriptions-item label="证件号码" label-align="center">
                {{userInfo.certificatesNo}}
            </el-descriptions-item>
        </el-descriptions>
        <el-form class="form" label-width="80" v-else :model="userAuthParam" :rules="rules" ref="form">
            <el-form-item label="用户姓名" prop="name">
                <el-input placeholder="请输入用户姓名" v-model="userAuthParam.name"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" prop="certificatesType">
                <el-select placeholder="请选择证件类型" class="selector" v-model="userAuthParam.certificatesType">
                    <el-option :label="item.name" :value="item.value" v-for="item in certificationTypeArr"
                        :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="certificatesNo">
                <el-input placeholder="请输入证件号码" v-model="userAuthParam.certificatesNo"></el-input>
            </el-form-item>
            <el-form-item label="上传证件" prop="certificatesUrl">
                <el-upload ref="upload" list-type="picture-card" :on-remove="removeHandler" :on-preview="previewHandler"
                    :on-success="successHandler" :on-exceed="exceedHandler" :limit="1"
                    action="/api/oss/file/fileUpload?fileHost=userAuah">
                    <img style="width:100%;" src="../../../assets/images/auth_example.png" alt="">
                </el-upload>
                <el-dialog v-model="previewDialogVisible">
                    <img w-full alt="Preview Image" :src="userAuthParam.certificatesUrl" style="width: 100%;" />
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="reset">重写</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { reqUserInfo, reqCertificationType,reqUserAuth } from '@/api/user'
import type { UserInfoResponseData, CertificationTypeResponseData, CertificationTypeArr } from '@/api/user/type'
import { ElMessage } from 'element-plus'
export default defineComponent({
    name: 'Certification',
    components: { InfoFilled },
    setup() {
        onMounted(() => {
            getUserInfo()
            getCertificationType()
        })
        const userInfo = ref<any>({})
        const getUserInfo = async () => {
            const result: UserInfoResponseData = await reqUserInfo()
            if (result.code == 200) {
                userInfo.value = result.data
            }
        }
        const certificationTypeArr = ref<CertificationTypeArr>([])
        const getCertificationType = async () => {
            const result: CertificationTypeResponseData = await reqCertificationType()
            if (result.code == 200) {
                certificationTypeArr.value = result.data
            }
        }
        const userAuthParam = reactive({
            certificatesNo: '',
            certificatesType: '',
            certificatesUrl: '',
            name: ''
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
        const rules={
            name:[{
                required:true,
                validator:validatorName
            }],
            certificatesType:[{
                required:true,
                message:'请选择证件类型'
            }],
            certificatesNo:[{
                required:true,
                validator:validatorNo
            }],
            certificatesUrl:[{
                required:true,
                message:'请上传证件照片'
            }]
        }
        const exceedHandler = () => {
            ElMessage({
                type: 'error',
                message: '最多只能上传1张图片'
            })
        }
        const successHandler = (response: any) => {
            form.value.clearValidate('certificatesUrl')
            userAuthParam.certificatesUrl = response.data
        }
        const previewDialogVisible = ref<boolean>(false)
        const previewHandler = () => {
            previewDialogVisible.value = true
        }
        const removeHandler = () => {
            userAuthParam.certificatesUrl = ''
        }
        const upload=ref()
        const reset = () => {
            upload.value.clearFiles()
            Object.assign(userAuthParam, {
                certificatesNo: '',
                certificatesType: '',
                certificatesUrl: '',
                name: ''
            })
        }
        const form=ref()
        const submit=async ()=>{
            await form.value.validate()
            try {
                await reqUserAuth(userAuthParam)
                ElMessage({
                    type:'success',
                    message:'认证成功'
                })
                getUserInfo()
            } catch (error) {
                ElMessage({
                    type:'error',
                    message:'认证失败'
                })
            }
        }
        return {
            userInfo,
            certificationTypeArr,
            userAuthParam,
            rules,
            exceedHandler,
            successHandler,
            previewDialogVisible,
            previewHandler,
            removeHandler,
            reset,
            upload,
            submit,
            form
        }
    }
})
</script>
<style lang="scss" scoped>
.box-card {
    margin-top: 20px;
    .tip {
        text-align: center;
        color: #7f7f7f;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        p {
            margin-left: 5px;
        }
    }

    :deep(.el-descriptions__label) {
        width: 200px;
    }

    .form {
        width: 60%;
        margin: 20px auto;

        .selector {
            width: 100%;
        }
    }
}
</style>