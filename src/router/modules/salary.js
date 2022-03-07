import layout from '@/layout'

export default {
  path: '/salary',
  name: 'salary',
  component: layout,
  children: [{ path: '',
    component: () => import('@/views/salary'),
    meta: {
      title: '工资管理',
      icon: 'money'
    }
  }]
}
