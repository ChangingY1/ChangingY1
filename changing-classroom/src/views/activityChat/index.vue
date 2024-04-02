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
        <el-col :span="4">

            <el-tag class="mx-1" effect="light" round size="large">
                {{ activity.title }}
            </el-tag>

            <el-card :body-style="{ padding: '0px' }" shadow="hover" style="width: 50%;">
                <img :src="`${activity.image}`" style=" width: 100%; display: block;" />
            </el-card>

            <div style="background-color: aliceblue;padding: 10px;">
                <div class="onLineUserDiv">
                    <div class="info">
                        <p class="time" style="font-size: medium;">
                            当前在线 : {{ onLineUser.length }}
                            &numsp;&numsp;&numsp;&numsp;&numsp;&numsp;&numsp;
                            <a @click="flushOnLineUser()"
                                style="font-size: small;color: rgb(30, 131, 226);cursor:pointer;">
                                <el-text class="mx-1" type="primary">刷新</el-text>
                                <img :src="`https://changingy.oss-cn-beijing.aliyuncs.com/icon/flush.png`">
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div style="background-color: aliceblue;padding-left: 15px;" v-for="(user, indexc) in onLineUser"
                :key="indexc">
                <div class="onLineUserDiv">
                    <img :src="`${user.avatar}`" style="width: 40px; height: 40px;border-radius: 50%;">
                    <div class="info">
                        <p class="userName"> {{ user.name }} </p>
                    </div>
                </div>
            </div>

        </el-col>
        <el-col :span="1">
        </el-col>

        <el-col :span="16">
            <el-scrollbar max-height="580px">
                <Chat></Chat>
            </el-scrollbar>
        </el-col>
    </el-row>
</template>

<script setup>
import Dropdown from '../../components/Dropdown.vue'
import Chat from '../../components/Chat.vue'
import { GetActivityInfo } from '../../api/activity'
import { GetOnlineUser } from '../../api/websocket'
import { ref, onMounted, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const activity = shallowRef({})
let onLineUser = ref([])

GetActivityInfo(route.query.activityId).then(response => {
    if (response.status == 200) {
        activity.value = response.data
    } else {
        ElMessage.error(response.data)
    }
})



function flushOnLineUser() {
    GetOnlineUser(route.query.activityId).then(response => {
        if (response.status == 200) {
            onLineUser.value = response.data
        } else {
            ElMessage.error(response.data)
        }
    })
}

onMounted(()=>setTimeout(() => flushOnLineUser(), 200))


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
</style>