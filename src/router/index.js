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
import StuActivityDetail from '../components/home/StuActivityDetail'
import Myinfo from '../components/home/Myinfo'
import modify from '../components/modify'
import feedbackmassage from '../components/home/feedbackmassage'
import ActivityInfo from '../components/home/ActivityInfo'
import JoinedActivityInfo from '../components/home/JoinedActivityInfo'
import AppIndexschool from '../components/index/Appindexschool'
import Appindexstudent from '../components/index/Appindexstudent'
import Appindexaca from '../components/index/Appindexaca'
import StuFeedback from '../components/home/StuFeedback'
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
          },
          {
            path: '/StuActivityDetail',
            name: 'StuActivityDetail',
            component: StuActivityDetail,
            meta: {
              title: '学生我的活动'
            }
          },
          {
            path: '/Myinfo',
            name: 'Myinfo',
            component: Myinfo,
            meta: {
              title: '个人信息'
            }
          },
          {
            path: '/ActivityInfo',
            name: 'ActivityInfo',
            component: ActivityInfo
          },
          {
            path: '/JoinedActivityInfo',
            name: 'JoinedActivityInfo',
            component: JoinedActivityInfo
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
          },
          {
            path: '/MyinfoSch',
            name: 'MyinfoSch',
            component: Myinfo,
            meta: {
              title: '个人信息'
            }
          },
          {
            path: '/ActivityInfo',
            name: 'ActivityInfo',
            component: ActivityInfo
          },
          {
            path: '/JoinedActivityInfo',
            name: 'JoinedActivityInfo',
            component: JoinedActivityInfo
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
            path: '/StuFeedback',
            name: 'StuFeedback',
            component: StuFeedback,
            meta: {
              title: '学生反馈'
            }
          },
          {
            path: '/StuActivityListStu',
            name: 'StuActivityListStu',
            component: StuActivityList,
            meta: {
              title: '学生活动'
            }
          },
          {
            path: '/feedbackmassageStu',
            name: 'feedbackmassageStu',
            component: feedbackmassage
          },
          {
            path: '/StuActivityDetailStu',
            name: 'StuActivityDetailStu',
            component: StuActivityDetail,
            meta: {
              title: '学生我的活动'
            }
          },
          {
            path: '/MyinfoStu',
            name: 'MyinfoStu',
            component: Myinfo,
            meta: {
              title: '个人信息'
            }
          },
          {
            path: '/ActivityInfostu',
            name: 'ActivityInfostu',
            component: ActivityInfo
          },
          {
            path: '/JoinedActivityInfostu',
            name: 'JoinedActivityInfostu',
            component: JoinedActivityInfo
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
          },
          {
            path: '/Myinfoaca',
            name: 'Myinfoaca',
            component: Myinfo,
            meta: {
              title: '个人信息'
            }
          }
        ]
    }
  ]

})
