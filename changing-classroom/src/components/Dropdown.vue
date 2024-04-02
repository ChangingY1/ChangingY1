<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            <el-avatar :size="40" :src="user.avatar" />
            {{ user.name }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="deleteCookie">退出账号</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import router from '../router';
import { ref, onMounted } from 'vue';
import { GetUserInfo } from '../api/login';

let user = ref({})
onMounted(() =>
    GetUserInfo().then(response => {
        if (response.status == 200) {
            user.value = response.data
        } else {
            ElMessage.error(response.data)
            router.push({ path: '/login' })
        }
    }, error => {
        ElMessage.error(error.message)
    }))

function deleteCookie() {
    if ($cookies.isKey("user")) {
        $cookies.remove("user")
    }
    router.push({
        path: '/login',
    })
}

</script>
<style scoped>
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>