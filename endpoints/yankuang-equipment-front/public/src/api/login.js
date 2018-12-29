import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/v1/users/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/v1/users/loginOut',
    method: 'post',
    headers: {
      token: '',
      authorityCode: 1
    }
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

