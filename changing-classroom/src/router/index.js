import { createRouter, createWebHashHistory } from 'vue-router'

import login from './modules/login'
import register from './modules/register'
import index from './modules/index'
import activityInfo from './modules/activityInfo'
import activityChat from './modules/activityChat'


const routes = [
    {
        path: "/",
        redirect: '/login',
    },
    ...index,
    ...login,
    ...register,
    ...activityInfo,
    ...activityChat,
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router