import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () =>
        import('@/views/login/index'),
  hidden: true
}, {
  path: '/authredirect',
  component: () =>
        import('@/views/login/authredirect'),
  hidden: true
}, {
  path: '/404',
  component: () =>
        import('@/views/errorPage/404'),
  hidden: true
}, {
  path: '/401',
  component: () =>
        import('@/views/errorPage/401'),
  hidden: true
}, {
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
            import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: { title: 'dashboard', icon: 'dashboard', noCache: true, auth: true }
  }]
}, { // 系统管理路由
  path: '/documentation',
  component: Layout,
  redirect: '/system/user',
  name: 'system',
  meta: {
    title: 'system',
    icon: 'nested'
  },
  children: [{
    path: 'organization',
    name: 'organization',
    component: () =>
                import('@/views/system/organization/index'),
    meta: { title: 'organization' }
  },
  {
    path: 'department',
    name: 'department',
    component: () =>
                import('@/views/system/department/index'),
    meta: { title: 'department' }
  },
  {
    path: 'role',
    name: 'role',
    component: () =>
                import('@/views/system/role/index'),
    meta: { title: 'role' }
  },
  {
    path: 'user',
    name: 'user',
    component: () =>
                import('@/views/system/user/index'),
    meta: { title: 'user' }
  },
  {
    path: 'jurisdiction',
    name: 'jurisdiction',
    component: () =>
                import('@/views/system/jurisdiction/index'),
    meta: { title: 'jurisdiction' }
  }
  ]
}, { // 通用设备管理路由
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'lease',
  meta: {
    title: 'lease',
    icon: 'component'
  },
  children: [{
    path: 'sticky',
    component: () =>
                import('@/views/components-demo/sticky'),
    name: 'sticky-demo',
    meta: { title: '通用设备维护' }
  },
  {
    path: 'zjEqMaintenance',
    component: () =>
                import('@/views/components-demo/zjEqMaintenance'),
    name: 'zjEqMaintenance-demo',
    meta: { title: '综机设备维护' }
  },
  {
    path: 'markdown',
    component: () =>
                import('@/views/components-demo/markdown'),
    name: 'markdown-demo',
    meta: { title: 'markdown' }
  },
  {
    path: 'tinymce',
    component: () =>
                import('@/views/components-demo/tinymce'),
    name: 'jsonEditor-demo',
    meta: { title: '功能位置' }
  },
  {
    path: 'splitpane',
    component: () =>
                import('@/views/components-demo/splitpane'),
    name: 'splitpane-demo',
    meta: { title: 'splitPane' }
  }
  ]
}, { // 综机设备管理路由
  path: '/zjManage',
  component: Layout,
  redirect: 'zjManage',
  name: 'zjManage',
  meta: {
    title: 'zjManage',
    icon: 'component'
  },
  children: [{
    path: 'sticky',
    component: () =>
                import('@/views/zjManage/sticky'),
    name: 'zjManagesticky-demo',
    meta: { title: '基本信息' }
  },
  {
    path: 'markdown',
    component: () =>
                import('@/views/zjManage/markdown'),
    name: 'zjManagemarkdown-demo',
    meta: { title: '规格型号' }
  },
  {
    path: 'tinymce',
    component: () =>
                import('@/views/zjManage/tinymce'),
    name: 'zjManagejsonEditor-demo',
    meta: { title: '功能位置' }
  },
  {
    path: 'splitpane',
    component: () =>
                import('@/views/zjManage/splitpane'),
    name: 'zjManagesplitpane-demo',
    meta: { title: '设备类型' }
  }
  ]
}, { // 设备租赁计划路由
  path: '/leasePlan',
  component: Layout,
  redirect: '/leasePlan/zongji',
  name: 'leasePlan67',
  meta: {
    title: '设备租赁计划',
    icon: 'nested'
  },
  children: [{
    path: 'zongji',
    component: () =>
                import('@/views/leasePlan/zongji/index'), // Parent router-view
    name: 'monthly456',
    meta: { title: '综机设备' },
    redirect: '/leasePlan/zongji/annual',
    children: [{
      path: 'annual',
      component: () =>
                        import('@/views/leasePlan/zongji/annual'),
      name: 'annual7',
      meta: { title: '综机年度租赁计划' }
    },
    {
      path: 'emergency',
      component: () =>
                        import('@/views/leasePlan/zongji/emergency'),
      name: 'emergency6',
      meta: { title: '综机应急租赁计划' }
    }
    ]
  },
  {
    path: 'general',
    name: 'general5',
    component: () =>
                import('@/views/leasePlan/general/index'),
    meta: { title: '通用设备' },
    redirect: '/leasePlan/general/monthly',
    children: [{
      path: 'monthly',
      component: () =>
                        import('@/views/leasePlan/general/monthly'),
      name: 'monthly15',
      meta: { title: '通用月度租赁计划' }
    },
    {
      path: 'annual',
      component: () =>
                        import('@/views/leasePlan/general/annual'),
      name: 'annual14',
      meta: { title: '通用年度租赁计划' }
    },
    {
      path: 'emergency',
      component: () =>
                        import('@/views/leasePlan/general/emergency'),
      name: 'emergency3',
      meta: { title: '通用应急租赁计划' }
    }
    ]
  }
  ]
}, { // 设备租赁路由
  path: '/apply',
  component: Layout,
  redirect: '/apply/eqApplication_zj',
  name: 'apply3',
  meta: {
    title: 'apply',
    icon: 'nested'
  },
  children: [{
    path: 'eqApplication_zj',
    name: 'eqApplication_zj222',
    component: () =>
                import('@/views/apply/eqApplication_zj/index'),
    meta: { title: '综机领用申请' }
  },
  {
    path: 'eqApplication_ty',
    name: 'eqApplication_ty222',
    component: () =>
                import('@/views/apply/eqApplication_ty/index'),
    meta: { title: '通用领用申请' }
  }
  ]
}, { // 设备退租路由
  path: '/retire',
  component: Layout,
  redirect: '/retire/eqRetire_zj',
  name: 'retire11',
  meta: {
    title: 'retire',
    icon: 'nested'
  },
  children: [{
    path: 'eqRetire_zj',
    name: 'eqRetire_zj111',
    component: () =>
                import('@/views/retire/eqRetire_zj/index'),
    meta: { title: '综机退租申请' }
  },
  {
    path: 'eqRetire_ty',
    name: 'eqRetire_ty111',
    component: () =>
                import('@/views/retire/eqRetire_ty/index'),
    meta: { title: '通用退租申请' }
  }
  ]
}, { // 设备计费路由
  path: '/eqCharging',
  component: Layout,
  redirect: '/eqCharging/chargingParams',
  name: 'eqCharging1',
  meta: {
    title: 'retire',
    icon: 'nested'
  },
  children: [{
    path: 'chargingParams',
    name: 'chargingParams111',
    component: () =>
            import('@/views/eqCharging/chargingParams/index'),
    meta: { title: '计费参数' }
  }]
}, { // 系统报表路由
  path: '/systemreport',
  component: Layout,
  redirect: '/systemreport/zongji',
  name: 'systemreport',
  meta: {
    title: 'systemreport',
    icon: 'nested'
  },
  children: [{
    path: 'zongji',
    name: 'zongji123',
    component: () =>
                import('@/views/systemreport/zongji/index'),
    meta: { title: '综机报表' }
  },
  {
    path: 'general',
    name: 'general123',
    component: () =>
                import('@/views/systemreport/general/index'),
    meta: { title: '通用报表' }
  }
  ]
}, {
  path: '/electromechanical',
  component: Layout,
  redirect: 'electromechanical',
  children: [{
    path: '/electromechanical',
    component: () =>
            import('@/views/systemreport/general/listofleasing/index'),
    name: 'listofleasing',
    meta: { title: '矿处通用机电租赁费用明细表', icon: 'electromechanical', noCache: true, auth: true }
  }]
}, {
  path: '/repairCostMonth',
  component: Layout,
  redirect: 'repairCostMonth',
  children: [{
    path: '/repairCostMonth',
    component: () =>
            import('@/views/systemreport/general/repairCostMonth/index'),
    name: 'repairCostMonth',
    meta: { title: '通用设备折旧修理费月报（跨矿）', icon: 'repairCostMonth', noCache: true, auth: true }
  }]
}, {
  path: '/listofcollectfees',
  component: Layout,
  redirect: 'listofcollectfees',
  children: [{
    path: '/listofcollectfees',
    component: () =>
            import('@/views/systemreport/general/listofcollectfees/index'),
    name: 'listofcollectfees',
    meta: { title: '矿处通用机电租赁费用汇总表', icon: 'listofcollectfees', noCache: true, auth: true }
  }]
}, {
  path: '/repairbillconfirmation',
  component: Layout,
  redirect: 'repairbillconfirmation',
  children: [{
    path: '/repairbillconfirmation',
    component: () =>
            import('@/views/systemreport/general/repairbillconfirmation/index'),
    name: 'repairbillconfirmation',
    meta: { title: '通用设备折旧修理费确认单', icon: 'repairbillconfirmation', noCache: true, auth: true }
  }]
}, {
  path: '/gather', // 综机折旧修理费汇总
  component: Layout,
  redirect: 'gather',
  children: [{
    path: '/gather',
    component: () =>
            import('@/views/systemreport/zongji/gather/index'),
    name: 'gather',
    meta: { title: '综机折旧修理费汇总表', icon: 'gather', noCache: true, auth: true }
  }]
}, {
  path: '/repair', // 综机折旧修理费报表
  component: Layout,
  redirect: 'repair',
  children: [{
    path: '/repair',
    component: () =>
            import('@/views/systemreport/zongji/repair/index'),
    name: 'repair',
    meta: { title: '综机折旧修理费报表', icon: 'repair', noCache: true, auth: true }
  }]
}, {
  path: '/monthReport', // 综机折旧修理费月报
  component: Layout,
  redirect: 'monthReport',
  children: [{
    path: '/monthReport',
    component: () =>
            import('@/views/systemreport/zongji/month/index'),
    name: 'monthReport',
    meta: { title: '综机折旧修理费月报', icon: 'monthReport', noCache: true, auth: true }
  }]
}, {
  path: '/ydhRepair', // 月东华重工
  component: Layout,
  redirect: 'ydhRepair',
  children: [{
    path: '/ydhRepair',
    component: () =>
            import('@/views/systemreport/zongji/ydh/index'),
    name: 'ydhRepair',
    meta: { title: '东华重工有限公司综机折旧修理费表', icon: 'ydhRepair', noCache: true, auth: true }
  }]
}, {
  path: '/zjmEquipment', // 综掘面综机设备使用清单
  component: Layout,
  redirect: 'zjmEquipment',
  children: [{
    path: '/zjmEquipment',
    component: () =>
            import('@/views/systemreport/zongji/zjmEquipment/index'),
    name: 'zjmEquipment',
    meta: { title: '综掘面综机设备使用清单', icon: 'zjmEquipment', noCache: true, auth: true }
  }]
}, {
  path: '/newDegree', // 新度系数调节费清单
  component: Layout,
  redirect: 'newDegree',
  children: [{
    path: '/newDegree',
    component: () =>
            import('@/views/systemreport/zongji/newDegree/index'),
    name: 'newDegree',
    meta: { title: '新度系数调节费清单', icon: 'newDegree', noCache: true, auth: true }
  }]
}, {
  path: '/abnormalLosses', // 非正常损失赔偿费
  component: Layout,
  redirect: 'abnormalLosses',
  children: [{
    path: '/abnormalLosses',
    component: () =>
            import('@/views/systemreport/zongji/abnormalLosses/index'),
    name: 'abnormalLosses',
    meta: { title: '非正常损失赔偿费表', icon: 'abnormalLosses', noCache: true, auth: true }
  }]
}, {
  path: '/useApply', // 综机设备使用交接单（设备管理中心）
  component: Layout,
  redirect: 'useApply',
  children: [{
    path: '/useApply',
    component: () =>
            import('@/views/systemreport/zongji/useApply/index'),
    name: 'useApply',
    meta: { title: '综机设备使用交接单', icon: 'useApply', noCache: true, auth: true }
  }]
}, {
  path: '/useApplyreceipt', // 综机设备使用交接单（收据凭证）
  component: Layout,
  redirect: 'useApplyreceipt',
  children: [{
    path: '/useApplyreceipt',
    component: () =>
            import('@/views/systemreport/zongji/useApplyreceipt/index'),
    name: 'useApplyreceipt',
    meta: { title: '综机设备使用交接单（收据凭证）', icon: 'useApplyreceipt', noCache: true, auth: true }
  }]
}, {
  path: '/useApplystub', // 综机设备使用交接单（使用单位存根）
  component: Layout,
  redirect: 'useApplystub',
  children: [{
    path: '/useApplystub',
    component: () =>
            import('@/views/systemreport/zongji/useApplystub/index'),
    name: 'useApplystub',
    meta: { title: '综机设备使用交接单（使用单位存根）', icon: 'useApplystub', noCache: true, auth: true }
  }]
}, {
  path: '/retairApply', // 综机设备停用交接单（设备管理中心）
  component: Layout,
  redirect: 'retairApply',
  children: [{
    path: '/retairApply',
    component: () =>
            import('@/views/systemreport/zongji/retairApply/index'),
    name: 'retairApply',
    meta: { title: '综机设备停用交接单', icon: 'retairApply', noCache: true, auth: true }
  }]
}, {
  path: '/retairApplypayment', // 综机设备停用交接单（设备管理中心）
  component: Layout,
  redirect: 'retairApplypayment',
  children: [{
    path: '/retairApplypayment',
    component: () =>
            import('@/views/systemreport/zongji/retairApplypayment/index'),
    name: 'retairApplypayment',
    meta: { title: '综机设备停用交接单（停缴凭证）', icon: 'retairApplypayment', noCache: true, auth: true }
  }]
}, {
  path: '/depreciationMonth', // 综机折旧修理费月报（汇总）月度明细
  component: Layout,
  redirect: 'depreciationMonth',
  children: [{
    path: '/depreciationMonth',
    component: () =>
            import('@/views/systemreport/zongji/depreciationMonth/index'),
    name: 'depreciationMonth',
    meta: { title: '综机折旧修理费月报（汇总）月度明细', icon: 'depreciationMonth', noCache: true, auth: true }
  }]
}, {
  path: '/depreciationYear', // 综机折旧修理费月报（汇总）年度明细
  component: Layout,
  redirect: 'depreciationYear',
  children: [{
    path: '/depreciationYear',
    component: () =>
            import('@/views/systemreport/zongji/depreciationYear/index'),
    name: 'depreciationYear',
    meta: { title: '综机折旧修理费月报（汇总）全年汇总', icon: 'depreciationYear', noCache: true, auth: true }
  }]
}]

export default new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
  // router: navrouter
})

// export const navrouter = [
// ]

export const asyncRouterMap = []
