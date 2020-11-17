import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'FindCar',
    component: () => import('../views/FindCar/Index.vue'),
    meta: {
      title: '找车',
      showFooter: true,
      index: 0,
      keepAlive: true
    }
  },
  {
    path: '/allcars',
    name: 'AllCars',
    component: () => import('../views/FindCar/AllCars.vue'),
    meta: {
      title: '全部车辆',
      showFooter: false
    }
  },
  // 车辆详情
  {
    path: '/cardetails',
    name: 'CarDetails',
    component: () => import('../views/FindCar/CarDetails.vue'),
    meta: {
      title: '车辆详情',
      showFooter: false
    }
  },
  // 商家详情
  {
    path: '/merchantdetails',
    name: 'MerchantDetails',
    component: () => import('../views/FindCar/MerchantDetails.vue'),
    meta: {
      title: '商家详情',
      showFooter: false
    }
  },
  // 查车
  {
    path: '/searchcar',
    name: 'SearchCar',
    component: () => import('../views/SearchCar/Index.vue'),
    meta: {
      title: '查车',
      showFooter: true,
      index: 1
    }
  },
  // 查车报告
  {
    path: '/report',
    name: 'report',
    component: () => import('../views/SearchCar/Report.vue'),
    meta: {
      title: '维保记录',
      showFooter: false
    }
  },
  // 维保记录
  {
    path: '/maintenancerecord',
    name: 'maintenancerecord',
    component: () => import('../views/SearchCar/MaintenanceRecord.vue'),
    meta: {
      title: '维保记录',
      showFooter: false
    }
  },
  // 支付完提示
  {
    path: '/payment',
    name: 'payment',
    component: () => import('../views/SearchCar/Payment.vue'),
    meta: {
      title: '维保记录',
      showFooter: false
    }
  },
  // 查询记录
  {
    path: '/searchrecord',
    name: 'searchrecord',
    component: () => import('../views/SearchCar/SearchRecord.vue'),
    meta: {
      title: '查询记录',
      showFooter: false
    }
  },
  // 超时
  {
    path: '/overtime',
    name: 'overtime',
    component: () => import('../views/SearchCar/Overtime.vue'),
    meta: {
      title: '查询记录',
      showFooter: false
    }
  },


  // 我的
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/My/Index.vue'),
    meta: {
      title: '我的',
      showFooter: true,
      index: 2,
      keepAlive: true
    }
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/My/Login.vue'),
    meta: {
      title: '登录',
      showFooter: false,
    }
  },
  // 车辆管理
  {
    path: '/vehiclemanagement',
    name: 'vehiclemanagement',
    component: () => import('../views/My/VehicleManagement.vue'),
    meta: {
      title: '车辆管理',
      showFooter: false,
    }
  },
   // 推广赚钱
   {
    path: '/popularize',
    name: 'popularize',
    component: () => import('../views/My/Popularize.vue'),
    meta: {
      title: '推广赚钱',
      showFooter: false,
    }
  },
  // 推广海报
  {
    path: '/poster',
    name: 'poster',
    component: () => import('../views/My/Poster.vue'),
    meta: {
      title: '365找车',
      showFooter: false
    }
  },
  // 余额提现
  {
    path: '/withdraw',
    name: 'withdraw',
    component: () => import('../views/My/Withdraw.vue'),
    meta: {
      title: '余额提现',
      showFooter: false
    }
  },
  // 余额提现成功
  {
    path: '/withdrawsuccess',
    name: 'withdrawsuccess',
    component: () => import('../views/My/WithdrawSuccess.vue'),
    meta: {
      title: '余额提现',
      showFooter: false
    }
  },
  // 余额提现失败
  {
    path: '/withdrawfail',
    name: 'withdrawfail',
    component: () => import('../views/My/WithdrawFail.vue'),
    meta: {
      title: '余额提现',
      showFooter: false
    }
  },
  // 收益记录
  {
    path: '/income',
    name: 'income',
    component: () => import('../views/My/Income.vue'),
    meta: {
      title: '收益记录',
      showFooter: false
    }
  },
  // 提现记录
  {
    path: '/withdrawrecord',
    name: 'withdrawrecord',
    component: () => import('../views/My/WithdrawRecord.vue'),
    meta: {
      title: '提现记录',
      showFooter: false
    }
  },
  // 推广协议
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('../views/My/Agreement.vue'),
    meta: {
      title: '推广赚钱',
      showFooter: false
    }
  },
  // 意见反馈
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/My/Feedback.vue'),
    meta: {
      title: '意见反馈',
      showFooter: false
    }
  },
  {
    path: '/feedbacksuc',
    name: 'feedbacksuc',
    component: () => import('../views/My/FeedBackSuc.vue'),
    meta: {
      title: '提交成功',
      showFooter: false
    }
  },
  // 车辆收藏
  {
    path: '/carcollect',
    name: 'carcollect',
    component: () => import('../views/My/CarCollect.vue'),
    meta: {
      title: '车辆收藏',
      showFooter: false
    }
  },
  // 关注店铺
  {
    path: '/followshop',
    name: 'followshop',
    component: () => import('../views/My/FollowShop.vue'),
    meta: {
      title: '关注店铺',
      showFooter: false
    }
  },
  // 浏览记录
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/My/History.vue'),
    meta: {
      title: '浏览记录',
      showFooter: false
    }
  },
  // 发布车辆
  {
    path: '/release',
    name: 'release',
    component: () => import('../views/My/Release.vue'),
    meta: {
      title: '发布车辆',
      showFooter: false
    }
  },
  // 发布成功
  {
    path: '/releasesuccess',
    name: 'releasesuccess',
    component: () => import('../views/My/ReleaseSuccess.vue'),
    meta: {
      title: '发布车辆',
      showFooter: false
    }
  },
  // 编辑成功
  {
    path: '/editsuccess',
    name: 'editsuccess',
    component: () => import('../views/My/EditSuccess.vue'),
    meta: {
      title: '编辑车辆',
      showFooter: false
    }
  },
  // 个人资料
  {
    path: '/personaldata',
    name: 'personaldata',
    component: () => import('../views/My/PersonalData.vue'),
    meta: {
      title: '个人资料',
      showFooter: false
    }
  },
  // 车商认证
  {
    path: '/cardealer',
    name: 'cardealer',
    component: () => import('../views/My/CarDealer.vue'),
    meta: {
      title: '车商认证',
      showFooter: false
    }
  },
  // 编辑车商认证
  {
    path: '/editcardealer',
    name: 'editcardealer',
    component: () => import('../views/My/EditCarDealer.vue'),
    meta: {
      title: '车商认证',
      showFooter: false
    }
  },
  // 个人认证
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/My/Personal.vue'),
    meta: {
      title: '个人认证',
      showFooter: false
    }
  },
  // 编辑个人认证
  {
    path: '/editpersonal',
    name: 'editpersonal',
    component: () => import('../views/My/EditPersonal.vue'),
    meta: {
      title: '个人认证',
      showFooter: false
    }
  },
  // 提交
  {
    path: '/submitsuccess',
    name: 'submitsuccess',
    component: () => import('../views/My/SubmitSuccess.vue'),
    meta: {
      title: '认证',
      showFooter: false
    }
  },
  // 提交
  {
    path: '/editsus',
    name: 'editsus',
    component: () => import('../views/My/EditSus.vue'),
    meta: {
      title: '认证',
      showFooter: false
    }
  },
  // 编辑车辆
  {
    path: '/editcar',
    name: 'editcar',
    component: () => import('../views/My/EditCar.vue'),
    meta: {
      title: '编辑车辆',
      showFooter: false
    }
  },

  // 联系我们
  {
    path: '/contactus',
    name: 'contactus',
    component: () => import('../views/My/ContactUs.vue'),
    meta: {
      title: '联系我们',
      showFooter: false
    }
  },
  // 商务合作
  {
    path: '/swhz',
    name: 'swhz',
    component: () => import('../views/My/Swhz.vue'),
    meta: {
      title: '商务合作',
      showFooter: false
    }
  },
  // 车商认证
  {
    path: '/csrz',
    name: 'csrz',
    component: () => import('../views/My/Csrz.vue'),
    meta: {
      title: '车商认证',
      showFooter: false
    }
  },

  // 查询等待
  {
    path: '/querywait',
    name: 'querywait',
    component: () => import('../views/SearchCar/QueryWait.vue'),
    meta: {
      title: '查车',
      showFooter: false
    }
  },
  
]

const router = new VueRouter({
  routes
})

export default router
