import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

export function getUserInfo() {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}
// 获取用户信息
export function getUserDetailById(id) {
  return request({
    method: 'GET',
    url: `/sys/user/${id}`
  })
}
// 保存用户信息
export function saveUserDetailById(data) {
  return request({
    method: 'PUT',
    url: `/sys/user/${data.id}`,
    data
  })
}
