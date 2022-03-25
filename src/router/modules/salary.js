import layout from '@/layout'

export default {
  path: '/salary',
  name: 'salarys',
  component: layout,
  children: [{ path: '',
    component: () => import('@/views/salary'),
    name: 'salarys',
    meta: {
      title: '工资管理',
      icon: 'money'
    }
  }]
}
