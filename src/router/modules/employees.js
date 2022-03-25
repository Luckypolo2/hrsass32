import layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
  component: layout,
  children: [{ path: '',
    component: () => import('@/views/employees'),
    name: 'employees',
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }, {
    path: 'detail/:id',
    component: () => import('@/views/employees/Detail'),
    hidden: true,
    meta: { title: '员工详情' }
  }, {
    path: 'print/:id',
    component: () => import('@/components/Print'),
    hidden: true,
    meta: { title: '打印' }
  }]
}
