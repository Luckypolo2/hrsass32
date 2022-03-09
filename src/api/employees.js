import request from '@/utils/request'

export const getEmployeesSimple = () => {
  return request({
    method: 'GET',
    url: '/sys/user/simple'
  })
}
