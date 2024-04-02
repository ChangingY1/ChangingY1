<template>
  <el-row>
    <el-col v-for="(item) in items" :span="4" :offset="1">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <img :src="item.image" style=" width: 100%; display: block;" />
        <div style="padding: 14px">
          <span>{{ item.title }}</span>
          <div class="bottom">
            <el-button type="primary" @click="openLink(item.id)" style="float: right;">详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>


<script setup>
import { ref } from 'vue'
import { GetAllActivities } from '../../api/activity';
import router from '../../router';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'

const route = useRoute()


let items = ref([])
GetAllActivities()
  .then(response => {
    if (response.status == 200) {
      items.value = response.data
    } else {
      ElMessage.error(response.data)
    }
  }, error => {
    ElMessage.error(error.message)
  })



const openLink = (id) => {
  router.push({
    path: '/activityInfo',
    query: {
      userId: route.query.id,
      activityId: id
    }
  })
};
</script>