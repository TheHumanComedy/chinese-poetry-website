/** @format */

export default [
  {
    path: '/explore',
    meta: {
      ignoreAuth: true,
      title: '发现更多'
    },
    component: resolve => require(['@pages/ExploreMore'], resolve)
  },
  {
    path: '/post/:id',
    meta: {
      ignoreAuth: true
    },
    component: resolve => require(['@pages/Post'], resolve)
  }
]
