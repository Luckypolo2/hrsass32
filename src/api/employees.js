import request from '@/utils/request'

export const getEmployeesSimple = () => {
  return request({
    method: 'GET',
    url: '/sys/user/simple'
  })
}
export const getEmployeesList = (params) => {
  return request({
    method: 'GET',
    url: '/sys/user',
    params
  })
}
export const delEmployee = (id) => {
  return request({
    method: 'DELETE',
    url: `/sys/user/${id}`
  })
}
export const addEmployee = (data) => {
  return request({
    method: 'POST',
    url: `/sys/user`,
    data
  })
}
export const importEmployee = (data) => {
  return request({
    method: 'POST',
    url: `/sys/user/batch`,
    data
  })
}
