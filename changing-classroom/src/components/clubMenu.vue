<template>
    <el-menu default-active="1" class="el-menu-vertical-demo" text-color="#666666">
      <el-menu-item index="1" @click="goMyClub">
        <el-icon><icon-menu /></el-icon>
        <span>讨论</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goChat">
        <el-icon>
          <document />
        </el-icon>
      </el-menu-item>
      <el-menu-item index="3" @click="goMessage">
        <el-icon>
          <setting />
        </el-icon>
      </el-menu-item>
    </el-menu>
  </template>
  
  <script setup>
  import {
    Document,
    Menu as IconMenu,
    Setting,
  } from '@element-plus/icons-vue'  
  </script>
  