<template>
  <el-row type="flex" justify="center" align="middle" style="height: 600px;">
    <el-col :span="14">
      <el-card class="um-loginbox">
        <el-row type="flex" justify="center" align="middle">
          <img src="https://element-plus.org/images/element-plus-logo.svg" style="width: 20%;">
          <el-divider />
          <el-col :span="10">
            <el-space direction="vertical" style="width: 100%;" size="small">
              <el-space direction="vertical" alignment="start" style="width: 100%;" size="large">
                <el-space direction="vertical" alignment="start" style="width: 100%;" size="small">
                  <el-tag size="large">手机号:</el-tag>
                  <el-input v-model="phoneNumber" placeholder="手机号码，仅支持大陆手机" size="large" style="width: 280px;" />
                  <el-row type="flex" justify="center" align="middle">
                    <el-input v-model="phoneCode" placeholder="短信验证码" size="large" style="width: 100px;" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" plain size="large" @click="getPhoneMessage"
                      style="width: 100px;font-size: small;">获取短信验证码</el-button>
                  </el-row>
                </el-space>
                <el-space direction="vertical" alignment="start" style="width: 100%;" size="small">
                  <el-tag size="large">密码:</el-tag>
                  <el-input v-model="password" type="password" placeholder="请设置密码" show-password size="large"
                    style="width: 280px;" />
                </el-space>
              </el-space>
            </el-space>
          </el-col>
          <el-col :span="10">
            <el-space direction="vertical" style="width: 100%;" size="small">
              <el-space direction="vertical" alignment="start" style="width: 100%;" size="large">
                <el-space direction="vertical" alignment="start" style="width: 100%;" size="small">
                  <el-tag size="large">学号:</el-tag>
                  <el-input v-model="studentId" placeholder="请输入学号" size="large" style="width: 280px;" />
                </el-space>
                <el-space direction="vertical" alignment="start" style="width: 100%;" size="small">
                  <el-tag size="large">姓名:</el-tag>
                  <el-input v-model="name" placeholder="请输入姓名" size="large" style="width: 280px;" />
                </el-space>
              </el-space>
            </el-space>
          </el-col>
        </el-row>



        <el-row>
          <el-space direction="vertical" style="width: 100%;" size="large">
            <br>
            <el-button type="primary" plain size="large" @click="register"
              style="width: 280px;">注&nbsp;册&nbsp;并&nbsp;登&nbsp;录</el-button>
            <el-link type="primary" @click="goLogin">已有账号？点击登录</el-link>
          </el-space>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import router from '../../router';
import { Register, GetPhoneMessage,GetUserInfo } from '../../api/login';
import { onMounted } from 'vue';


let phoneNumber = ref('')
let password = ref('')
let studentId = ref('')
let name = ref('')
let phoneCode = ref('')

const userRegisterDto = ref({
  phoneNumber: phoneNumber,
  password: password,
  studentId: studentId,
  name: name,
  phoneCode: phoneCode
})

function register() {
  Register(userRegisterDto.value)
    .then(response => {
      if (response.status == 200) {
        ElMessage.success(response.data)
        router.push({
          path: '/index',
          query: {
            userPhoneNumber: userRegisterDto.phoneNumber,
          }
        })
      } else {
        ElMessage.error(response.data)
      }
    }, error => {
      ElMessage.error(error.message)
    })
}

function getPhoneMessage() {
  GetPhoneMessage(userRegisterDto.value.phoneNumber)
    .then(response => {
      if (response.status == 200) {
        ElMessage.success(response.data)
      } else {
        ElMessage.error(response.data)
      }
    }, error => {
      ElMessage.error(error.message)
    })
}

function goLogin() {
  router.push({ path: '/login' })
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
  }))</script>