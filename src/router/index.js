import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '../components/Login'
import AppIndex from '../components/home/AppIndex'
import ActivityAdd from '../components/home/ActivityAdd'
import ActivityList from '../components/home/ActivityList'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 下面都是固定的写法
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      // meta: {
      //   requireAuth: true
      // }
      // 输入路由home会重定向到Preferred页面(一进来显示的页面)
      redirect: {name: 'ActivityAdd'},
      children:
        [
          {
            path: '/ActivityAdd',
            name: 'ActivityAdd',
            component: ActivityAdd,
            meta: {
              title: '活动添加'
            }
          },
          {
            path: '/ActivityList',
            name: 'ActivityList',
            component: ActivityList,
            meta: {
              title: '活动列表'
            }
          }
        ]
    }
  ]

})
