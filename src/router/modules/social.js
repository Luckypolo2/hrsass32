import layout from '@/layout'

export default {
  path: '/social',
  name: 'social_securitys',
  component: layout,
  children: [{ path: '',
    component: () => import('@/views/social'),
    meta: {
      title: '社保管理',
      icon: 'table'
    }
  }]
}
