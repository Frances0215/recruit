import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '../components/Login'
import AppIndex from '../components/index/AppIndex'
import ActivityAdd from '../components/home/ActivityAdd'
import ActivityList from '../components/home/ActivityList'
import StuActivityList from '../components/home/StuActivityList'
import waitAudit from '../components/home/waitAudit'
import auditList from '../components/home/auditList'
import ActivityDetail from '../components/home/ActivityDetail'
import feedback from '../components/home/feedback'
import modify from '../components/modify'
import feedbackmassage from '../components/home/feedbackmassage'
import AppIndexschool from '../components/index/Appindexschool'
import Appindexstudent from '../components/index/Appindexstudent'
import Appindexaca from '../components/index/Appindexaca'

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
      path: '/modify',
      name: 'modify',
      component: modify
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
              title: '活动添加', requireAuth: true, roles: ['super']
            }
          },
          {
            path: '/ActivityList',
            name: 'ActivityList',
            component: ActivityList,
            meta: {
              title: '活动列表'
            }
          },
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
          },
          {
            path: '/feedback',
            name: 'feedback',
            component: feedback,
            meta: {
              title: '活动反馈'
            }
          },
          {
            path: '/feedbackmassage',
            name: 'feedbackmassage',
            component: feedbackmassage,
            meta: {
              title: '反馈信息'
            }
          },
          {
            path: '/StuActivityList',
            name: 'StuActivityList',
            component: StuActivityList,
            meta: {
              title: '学生活动'
            }
          }
        ]
    },
    {
      path: '/indexschool',
      name: 'AppIndexschool',
      component: AppIndexschool,
      // meta: {
      //   requireAuth: true
      // }
      // 输入路由home会重定向到Preferred页面(一进来显示的页面)
      redirect: {name: 'ActivityAddSch'},
      children:
        [
          {
            path: '/ActivityAddSch',
            name: 'ActivityAddSch',
            component: ActivityAdd,
            meta: {
              title: '活动添加', requireAuth: true, roles: ['super']
            }
          },
          {
            path: '/ActivityListSch',
            name: 'ActivityListSch',
            component: ActivityList,
            meta: {
              title: '活动列表'
            }
          },
          {
            path: '/waitAuditSch',
            name: 'waitAuditSch',
            component: waitAudit,
            meta: {
              title: '待审核'
            }
          },
          {
            path: '/auditListSch',
            name: 'auditListSch',
            component: auditList,
            meta: {
              title: '审核记录'
            }
          },
          {
            path: '/feedbackSch',
            name: 'feedbackSch',
            component: feedback,
            meta: {
              title: '活动反馈'
            }
          },
          {
            path: '/feedbackmassageSch',
            name: 'feedbackmassageSch',
            component: feedbackmassage
          }
        ]
    },
    {
      path: '/indexstudent',
      name: 'AppIndexstudent',
      component: Appindexstudent,
      // meta: {
      //   requireAuth: true
      // }
      // 输入路由home会重定向到Preferred页面(一进来显示的页面)
      // redirect: {name: 'StuActivityList'},
      redirect: {name: 'StuActivityListStu'},
      children:
        [
          {
            path: '/StuActivityListStu',
            name: 'StuActivityListStu',
            component: StuActivityList,
            meta: {
              title: '学生活动'
            }
          }
        ]
    },
    {
      path: '/indexaca',
      name: 'AppIndexaca',
      component: Appindexaca,
      redirect: {name: 'ActivityListaca'},
      // meta: {
      //   requireAuth: true
      // }
      // 输入路由home会重定向到Preferred页面(一进来显示的页面)
      // redirect: {name: 'StuActivityList'},
      children:
        [
          {
            path: '/ActivityListaca',
            name: 'ActivityListaca',
            component: ActivityList,
            meta: {
              title: '活动列表'
            }
          },
          {
            path: '/waitAuditaca',
            name: 'waitAuditaca',
            component: waitAudit,
            meta: {
              title: '待审核'
            }
          },
          {
            path: '/auditListaca',
            name: 'auditListaca',
            component: auditList,
            meta: {
              title: '审核记录'
            }
          },
          {
            path: '/feedbackaca',
            name: 'feedbackaca',
            component: feedback,
            meta: {
              title: '活动反馈'
            }
          },
          {
            path: '/feedbackmassageaca',
            name: 'feedbackmassageaca',
            component: feedbackmassage
          }
        ]
    }
  ]

})
