<template>
    <el-affix>
        <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="2">
                <br>
                <img src="https://element-plus.org/images/element-plus-logo.svg">
            </el-col>
            <el-col :span="18"></el-col>
            <el-col :span="2">
                <br>
                <Dropdown></Dropdown>
            </el-col>
        </el-row>
        <el-divider />
    </el-affix>
    <el-row justify="center">
        <el-col :span="12">
            <el-descriptions class="margin-top" title="活动详情" :column="3" border size="large">
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin-right: 8px;">
                                <Aim />
                            </el-icon>
                            活动名称
                        </div>
                    </template>
                    {{ activity.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin-right: 8px;">
                                <Mic />
                            </el-icon>
                            举办单位
                        </div>
                    </template>
                    {{ activity.organizer }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin-right: 8px;">
                                <CollectionTag />
                            </el-icon>
                            活动类型
                        </div>
                    </template>
                    <el-tag size="large">{{ activity.type }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin-right: 8px;">
                                <Timer />
                            </el-icon>
                            活动时间
                        </div>
                    </template>
                    {{ activity.startTime }} <br>
                    至
                    <br>{{ activity.endTime }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin-right: 8px;">
                                <location />
                            </el-icon>
                            活动地址
                        </div>
                    </template>
                    {{ activity.location }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin-right: 8px;">
                                <user />
                            </el-icon>
                            活动人员
                        </div>
                    </template>
                    {{ activity.registeredCount }}/{{ activity.maxParticipants }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon style="margin-right: 8px;">
                                <tickets />
                            </el-icon>
                            活动详情
                        </div>
                    </template>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ activity.description }}
                </el-descriptions-item>
            </el-descriptions>
        </el-col>
    </el-row>
    <el-row justify="center"> <br> </el-row>
    <el-row justify="center">
        <el-button type="primary" round size="large" @click="joinConfirm()">报名活动</el-button>
    </el-row>
    <el-row justify="center">
        <el-button round size="large" @click="goChat()">活动群聊</el-button>
    </el-row>
</template>


<script setup>
import Dropdown from '../../components/Dropdown.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, shallowRef } from 'vue'
import {
    CollectionTag,
    Location,
    Mic,
    Tickets,
    User,
    Timer,
    Aim,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { SignUp, GetActivityInfo } from '../../api/activity'
import { GetUserInfo } from '../../api/login';
import router from '../../router';

const route = useRoute()

const goChat = () => {
    router.push({
    path: '/activityChat',
    query: {
      activityId: route.query.activityId
    }
  })
}
const joinConfirm = () => {
    ElMessageBox.confirm(
        '是否确认报名此活动',
        '消息确认',
        {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'info',
        }
    )
        .then(() => {
            SignUp({
                userId: userInfo.value.id,
                activityId: activity.value.id
            }).then(response => {
                if (response.status == 200) {
                    ElMessage.success(response.data)
                } else {
                    ElMessage.error(response.data)
                }
            }, error => {
                ElMessage.error(error.message)
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '申请取消',
            })
        })
}
const userInfo = shallowRef({})
const activity = shallowRef({})
GetUserInfo().then(response => {
    if (response.status == 200) {
        userInfo.value = response.data
    } else {
        ElMessage.error(response.data)
        router.push({ path: '/login' })
    }
})
GetActivityInfo(route.query.activityId).then(response => {
    if (response.status == 200) {
        activity.value = response.data
    } else {
        ElMessage.error(response.data)
    }
})

</script>

<style scoped>
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

.onLineUserDiv {
    display: flex;
}

.info {
    margin-left: 10px;
}

.userName {
    font-size: 16px;
    color: rgb(0, 0, 0);
}

.el-descriptions {
    margin-top: 20px;
}

.cell-item {
    display: flex;
    align-items: center;
}

.margin-top {
    margin-top: 20px;
}
</style>