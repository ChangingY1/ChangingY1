<template>
  <el-affix>
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="2">
        <br>
        <img src="https://element-plus.org/images/element-plus-logo.svg" alt="">
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
      <br><br>
      <Menu></Menu>
    </el-col>

    <el-col :span="1">
    </el-col>

    <el-col :span="16">
      <el-scrollbar max-height="580px">
        <router-view></router-view>
      </el-scrollbar>
    </el-col>

  </el-row>
</template>

<script setup>
import Menu from '../../components/indexMenu.vue'
import Dropdown from '../../components/Dropdown.vue'
import axios from 'axios';
import router from '../../router/index.js'
import { ref } from 'vue';




</script>