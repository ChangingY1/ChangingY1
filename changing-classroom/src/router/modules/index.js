import Index from '../../views/index/index.vue'
import Message from '../../views/index/message.vue'
import Activity from '../../views/index/activity.vue'


export default [
  {
    path: "/index",
    name: 'index',
    component: Index,
    children: [
      {
        path: '',
        component: Activity,
      },
      {
        path: 'message',
        component: Message,
      },
      {
        path: 'activity',
        component: Activity,
      },
    ],
  }
]
