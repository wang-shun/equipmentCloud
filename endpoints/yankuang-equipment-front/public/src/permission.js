import router from './router'
// // import store from './store'
// // import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css'// progress bar style
// import { getToken } from '@/utils/auth' // getToken from cookie

// NProgress.configure({ showSpinner: false })// NProgress Configuration

// // permission judge function
// // function hasPermission(roles, permissionRoles) {
// //   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
// //   if (!permissionRoles) return true
// //   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// // }

// const whiteList = ['/login', '/authredirect']// no redirect whitelist
// import Cookies from 'js-cookie'
// const token = Cookies.get('token')
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  // console.log(token, '111111')
  // NProgress.start() // start progress bar
  if (token) { // determine if there has token
    /* has token*/
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
    /* has no token*/
    // if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    //   next()
    // } else {
    //   next('/login') // 否则全部重定向到登录页
    //   NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    // }
  }
})
// const token = localStorage.getItem('token')
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
//     if (token) { // 判断当前的token是否存在
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   } else {
//     next()
//   }
// })

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
