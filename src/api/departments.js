import request from '@/utils/request'

export const getDepartments = () => {
  return request({
    method: 'GET',
    url: '/company/department'
  })
}

export const delDepartments = (id) => {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

export const addDepartments = (data) => {
  return request({
    method: 'POST',
    url: '/company/department',
    data
  })
}
