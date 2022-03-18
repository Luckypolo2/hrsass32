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

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
