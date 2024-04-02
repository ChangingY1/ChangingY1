<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" text-color="#666666">
    <el-menu-item index="1" @click="goChat">
      <el-icon>
        <document />
      </el-icon>
      <span>活动</span>
    </el-menu-item>
    <el-menu-item index="2" @click="goMessage">
      <el-icon>
        <setting />
      </el-icon>
      <span>收件箱</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import router from '../router';
import {useRoute} from 'vue-router';

const route = useRoute()

function goChat() {
  router.push({
    path: '/index/activity', 
    query: {
      ...route.query
    }
  })
}
function goMessage() {
  router.push({ 
    path: '/index/message',
    query: {
      ...route.query
    }
  })
}



</script>
