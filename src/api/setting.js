import request from '@/utils/request'

export const getRoleList = (params) => {
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}

export const getCompanyInfo = (companyId) => {
  return request({
    method: 'GET',
    url: `/company/${companyId}`
  })
}

export const deleteRole = (id) => {
  return request({
    method: 'DELETE',
    url: `/sys/role/${id}`
  })
}

export const getRoleDetail = (id) => {
  return request({
    method: 'GET',
    url: `/sys/role/${id}`
  })
}

export const updateRole = (data) => {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}

export const addRole = (data) => {
  return request({
    method: 'POST',
    url: '/sys/role/',
    data
  })
}
/**
 * @param {Object} data permIds, id
 * */
export const assignPerm = (data) => {
  return request({
    method: 'PUT',
    url: '/sys/role/assignPrem',
    data
  })
}
