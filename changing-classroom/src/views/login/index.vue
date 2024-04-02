<template>
  <el-row type="flex" justify="center" align="middle" style="height: 600px;">
    <el-col :span="12">
      <el-card class="um-loginbox">
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="12">
            <br>
            <img src="https://element-plus.org/images/element-plus-logo.svg" style="width: 50%;">
            <el-divider />
            <el-space direction="vertical" style="width: 100%;" size="small">
              <el-space direction="vertical" alignment="start" style="width: 100%;" size="large">
                <el-space direction="vertical" alignment="start" style="width: 100%;" size="small">
                  <el-tag size="large">用户名:</el-tag>
                  <el-input v-model="phoneNumber" placeholder="请输入手机号" size="large" style="width: 280px;" />
                </el-space>
                <el-space direction="vertical" alignment="start" style="width: 100%;" size="small">
                  <el-tag size="large">密&nbsp;&nbsp;&nbsp;码:</el-tag>
                  <el-input v-model="password" type="password" placeholder="请输入密码" show-password size="large"
                    style="width: 280px;" />
                </el-space>
              </el-space>
              <br>
              <el-space direction="vertical" style="width: 100%;" size="large">
                <el-button type="primary" plain size="large" @click="login"
                  style="width: 280px;">点&nbsp;击&nbsp;登&nbsp;录</el-button>
                <el-link type="primary" @click="goRegister">还没有账号？点击注册</el-link>
              </el-space>
            </el-space>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="8">
            <img src="https://element-plus.org/images/element-plus-logo.svg" alt="">
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { Login,GetUserInfo } from '../../api/login';
import { onMounted } from 'vue';
import router from '../../router/index.js'


let phoneNumber = ref('')
let password = ref('')
let loginDto = ref({
  phoneNumber: phoneNumber,
  password: password
})

function login() {
  Login(loginDto.value)
    .then(response => {
      if (response.status == 200) {
        ElMessage.success(response.data)
        router.push({
          path: '/index',
          query: {
            userPhoneNumber: loginDto.phoneNumber,
          }
        })
      } else {
        ElMessage.error(response.data)
      }
    }, error => {
      ElMessage.error(error.message)
    })
}

function goRegister() {
  router.push({ path: '/register' })
}

onMounted(() =>
  GetUserInfo().then(response => {
    if (response.status == 200) {
      ElMessage.success(response.data)
      router.push({
        path: '/index',
        query: {
          userPhoneNumber: response.data.phoneNumber,
        }
      })
    } else {
      ElMessage.error(response.data)
    }
  }, error => {
    ElMessage.error(error.message)
  }))

</script>
