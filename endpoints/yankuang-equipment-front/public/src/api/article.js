import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

// 规格型号列表
export function specificationTypeList(query) {
  return request({
    url: '/v1/sbmodel/list',
    method: 'get',
    params: query
  })
}
// 设备大类list
export function eqBigTypeList(query) {
  return request({
    url: '/v1/sbtype/listByPcodeOrLevel',
    method: 'get',
    params: query
  })
}
// 添加规格型号
export function addEqSpType(query) {
  return request({
    url: '/v1/sbmodel/create',
    method: 'post',
    params: query
  })
}
