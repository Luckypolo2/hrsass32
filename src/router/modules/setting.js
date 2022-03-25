import layout from '@/layout'

export default {
  path: '/settings',
  name: 'settings',
  component: layout,
  children: [{ path: '',
    component: () => import('@/views/setting'),
    name: 'setting',
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
