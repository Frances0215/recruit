import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '../components/Login'
import AppIndex from '../components/home/AppIndex'
import ActivityAdd from '../components/home/ActivityAdd'
import ActivityList from '../components/home/ActivityList'
import waitAudit from '../components/home/waitAudit'
import auditList from '../components/home/auditList'
import feedback from '../components/home/feedback'

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
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      // meta: {
      //   requireAuth: true
      // }
      // 输入路由home会重定向到Preferred页面(一进来显示的页面)
      redirect: {name: 'audit'},
      children:
        [
          {
            path: '/waitAudit',
            name: 'waitAudit',
            component: waitAudit,
            meta: {
              title: '待审核'
            }
          },
          {
            path: '/auditList',
            name: 'auditList',
            component: auditList,
            meta: {
              title: '审核记录'
            }
          }
        ]
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex,
      // meta: {
      //   requireAuth: true
      // }
      // 输入路由home会重定向到Preferred页面(一进来显示的页面)
      redirect: {name: 'feedback'},
      children:
        [
          {
            path: '/feedback',
            name: 'feedback',
            component: feedback,
            meta: {
              title: '活动反馈'
            }
          }
        ]
    }
  ]

})
