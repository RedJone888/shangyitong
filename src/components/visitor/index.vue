<template>
    <div class="visitor">
        <div class="top">
            <div class="left">
                <span class="free">{{ visitor.isInsure == 1 ? '医保' : '自费' }}</span>
                <span class="username">{{ visitor.name }}</span>
            </div>
            <div class="right">
                <el-button type="primary" :icon="Edit" circle @click.stop="changeScene"></el-button>
                <el-popconfirm width="180" :icon="InfoFilled" icon-color="red" :title="`确定要删除${visitor.name}吗?`" @confirm="removeVisitor">
                <template #reference>
                        <el-button type="danger" :icon="Delete" circle v-if="$route.path == '/user/patient'"></el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>
        <div class="bottom">
            <p>证件类型：{{ visitor.param.certificatesTypeString }}</p>
            <p>证件号码：{{ visitor.certificatesNo }}</p>
            <p>用户性别：{{ visitor.sex == 0 ? '女' : '男' }}</p>
            <p>出生日期：{{ visitor.birthdate }}</p>
            <p>手机号码：{{ visitor.phone }}</p>
            <p>婚姻状况：{{ visitor.isMarry == 0 ? '未婚' : '已婚' }}</p>
            <p>当前住址：{{ visitor.param.cityString }}</p>
            <p>详细地址：{{ visitor.param.fullAddress }}</p>
            <div class="confirm" v-if="visitor.id == currentVisitorId">已选择</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router'
import { useRoute, useRouter } from 'vue-router'
import {ElMessage} from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'
import {deleteVisitor} from '@/api/user'
export default defineComponent({
    name: 'Visitor',
    props: ['visitor', 'currentVisitorId'],
    setup(props, { emit }) {
        const $route = useRoute()
        const $router = useRouter()
        const changeScene = () => {
            if ($route.path == '/user/patient') {
                emit('changeScene', props.visitor)
            } else {
                $router.push({ path: '/user/patient', query: { type: 'edit', id: props.visitor.id } })
            }
        }
        const removeVisitor=async ()=>{
            try {
                await deleteVisitor(props.visitor.id)
                ElMessage({
                    type:'success',
                    message:'删除成功'
                })
                emit('removeVisitor')
            } catch (error) {
                ElMessage({
                    type:'error',
                    message:'删除失败'
                })                
            }
        }
        return {
            Edit,
            Delete,
            changeScene,
            removeVisitor
        }
    }
})
</script>
<style lang="scss" scoped>
.visitor {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);

    .top {
        line-height: 60px;
        padding: 0 20px;
        background-color: #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            .free {
                background-color: #fff;
                font-size: 12px;
                padding: 5px;
                border-radius: 5px;
                margin-right: 5px;
            }

            .username {
                color: #7f7f7f;
            }
        }
    }

    .bottom {
        position: relative;
        padding: 20px;
        font-size: 14px;

        p {
            line-height: 30px;
        }

        .confirm {
            position: absolute;
            top: 15%;
            left: 20%;
            width: 200px;
            line-height: 200px;
            text-align: center;
            color: red;
            border-radius: 50%;
            border: 1px dashed red;
            font-size: 20px;
            font-weight: 900;
            opacity: 0.3;
            transform: rotate(45deg);
        }
    }
}</style>