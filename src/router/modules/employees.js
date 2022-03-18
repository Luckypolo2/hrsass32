import layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
  component: layout,
  children: [{ path: '',
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }, {
    path: 'detail/:id',
    component: () => import('@/views/employees/Detail'),
    hidden: true,
    meta: { title: '员工详情' }
  }]
}
