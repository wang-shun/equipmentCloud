import vue from 'vue'

// 公共IP
// export const baseIP = 'http://el-dev.app.terminus.io'
export const baseIP = 'https://el-test.app.terminus.io'

function getHeaders(obj) {
  return {
    token: obj.token,
    authorityCode: obj.authorityCode,
    'Content-Type': 'application/json'
  }
}

// get请求方法
export function require_get(url, obj, params, succ, error){
    const headers = getHeaders(obj)
    vue.prototype.$axios.get(baseIP + url, {headers: headers, params: params}).then((res) => succ(res)).catch((err) => error(err))
}
// post请求方法
export function require_post(url, obj, params, succ, error){
    const headers = getHeaders(obj)
    vue.prototype.$axios.post(baseIP + url, params, {headers: headers}).then((res) => succ(res)).catch((err) => error(err))
}
// put请求方法
export function require_put(url, obj, params, succ, error){
    const headers = getHeaders(obj)
    vue.prototype.$axios.put(baseIP + url, params, {headers: headers}).then((res) => succ(res)).catch((err) => error(err))
}
// delete请求方法
export function require_delete(url, obj, params, succ, error){
    const headers = getHeaders(obj)
    vue.prototype.$axios.delete(baseIP + url, {headers: headers, params: params}).then((res) => succ(res)).catch((err) => error(err))
}
// patch请求方法
export function require_patch(url, obj, params, succ, error){
    const headers = getHeaders(obj)
    vue.prototype.$axios.patch(baseIP + url, params, {headers: headers}).then((res) => succ(res)).catch((err) => error(err))
}
// 按钮控制方法
export function controllbutton(pageurl){
    const navLists = JSON.parse(sessionStorage.getItem('navList'))
    var listbutton = []
    var pagecode = ''
    for (let i = 0; i < navLists.length; i++) {
      if(navLists[i].url === pageurl) {
        listbutton = navLists[i].childList
        pagecode = navLists[i].code
      }
      for(let j = 0; j < navLists[i].childList.length; j++) {
          if(navLists[i].childList[j].url === pageurl)
            listbutton = navLists[i].childList[j].childList
            pagecode = navLists[i].childList[j].code
            for(let k = 0; k < navLists[i].childList[j].childList.length; k++) {
                if(navLists[i].childList[j].childList[k].url === pageurl)
                  listbutton = navLists[i].childList[j].childList[k].childList
                  pagecode = navLists[i].childList[j].childList[k].code
            }
      }
    }
    return [listbutton, pagecode]
} 
