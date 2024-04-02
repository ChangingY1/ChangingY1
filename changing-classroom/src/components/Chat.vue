<template>
    <div class="chat-content">
        <el-scrollbar max-height="420px" style="height:420px ;" ref="scrollbarRef" always>
            <!-- recordContent 聊天记录数组-->
            <div ref="innerRef">
                <div v-for="(messageInfo, indexc) in recordContent" :key="indexc">
                    <!-- 对方 -->
                    <div class="word" v-if="!messageInfo.mineMsg">
                        <img :src="`${messageInfo.userAvatar}`">
                        <div class="info">
                            <p class="time">{{ messageInfo.userName }} {{ chatTime(messageInfo.time) }}</p>
                            <div class="info-content" style="white-space: pre-wrap;word-break: break-all;">{{
                    messageInfo.message
                }}</div>
                        </div>
                    </div>
                    <!-- 我的 -->
                    <div class="word-my" v-else>
                        <div class="info-my">
                            <p class="time">{{ messageInfo.userName }} {{ chatTime(messageInfo.time) }}</p>
                            <div class="info-content-my" style="white-space: pre-wrap;word-break: break-all;">{{
                    messageInfo.message }}</div>
                        </div>
                        <img :src="`${messageInfo.userAvatar}`">
                    </div>
                </div>
            </div>
        </el-scrollbar>
        <el-divider />

        <el-row>
            <el-col :span="20">
                <el-form-item>
                    <el-input v-model="textarea" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                        placeholder="Please input" style="float: left;" />
                </el-form-item>
            </el-col>
            <el-col :span="1">
            </el-col>
            <el-col :span="3">
                <el-form-item>
                    <el-button type="primary" @click="send"
                        style="float: right;height: 50px;width: 80px;">发送</el-button>
                </el-form-item>
            </el-col>
        </el-row>

    </div>
</template>


<script setup>
import { useRoute } from 'vue-router'
import { ref, reactive, onMounted, defineProps, nextTick } from 'vue'
import { GetMessageInfoByActivityId } from '../api/activity'

const route = useRoute()
let websocket
let textarea = ref('')
let recordContent = ref([])



function send() {
    if (textarea.value !== '') {
        websocket.send(JSON.stringify(textarea.value))
        textarea.value = ''
    }
}

function getMessageInfoByActivityId(activityId) {
    GetMessageInfoByActivityId(activityId).then(
        (response) => {
            recordContent.value = response.data
            handleClick()
        },
    )
}

function openWebsoket() {
    websocket = new WebSocket("ws://localhost:8500/api/websocket/activity/" + route.query.activityId);
    // 连接断开
    websocket.onclose = e => {
        console.log(`连接关闭: code=${e.code}, reason=${e.reason}`)
    }
    // 收到消息
    websocket.onmessage = e => {
        let obj = JSON.parse(e.data)
        recordContent.value.push(obj)
        handleClick()
    }
    // 异常
    websocket.onerror = e => {
        console.log("连接异常")
        console.error(e)
    }
    // 连接打开
    websocket.onopen = e => {
        // websocket.send('hallo')
        // 也可以由客户端主动断开
        // websocket.close();
    }
}
window.addEventListener('beforeunload', function () {
    // 关闭 WebSocket 连接
    websocket.close();
});

const scrollbarRef = ref() // 滚动条实例
const innerRef = ref() // 内容实例

function handleClick() {
    if (scrollbarRef.value.setScrollTop !== null) {
        nextTick(() => {
            scrollbarRef.value.setScrollTop(innerRef.value.clientHeight)
        })
    }
}

onMounted(() => openWebsoket(), getMessageInfoByActivityId(route.query.activityId)
)

function chatTime(timestamp) {
    return timestamp
}



</script>

<style scoped>
.chat-content {
    width: 93%;
    padding: 20px;
    background-color: aliceblue;
}

.word {
    display: flex;
    margin-bottom: 20px;
}

img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.info {
    margin-left: 10px;
}

.time {
    font-size: 12px;
    color: rgba(51, 51, 51, 0.8);
    margin: 0;
    height: 20px;
    line-height: 20px;
    margin-top: -5px;
}

.info-content {
    padding: 10px;
    font-size: 14px;
    background: #fff;
    position: relative;
    margin-top: 8px;
}

.info-content::before {
    position: absolute;
    left: -8px;
    top: 8px;
    content: '';
    border-right: 10px solid #FFF;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
}

.word-my {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.info-my {
    width: 90%;
    margin-left: 10px;
    text-align: right;
}

.time {
    font-size: 12px;
    color: rgba(51, 51, 51, 0.8);
    margin: 0;
    height: 20px;
    line-height: 20px;
    margin-top: -5px;
    margin-right: 10px;
}

.info-content-my {
    padding: 10px;
    font-size: 14px;
    float: right;
    margin-right: 10px;
    position: relative;
    margin-top: 8px;
    background: #A3C3F6;
    text-align: left;
}

.info-content-my::after {
    position: absolute;
    right: -8px;
    top: 8px;
    content: '';
    border-left: 10px solid #A3C3F6;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
}
</style>