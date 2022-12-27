
const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: "/panel-usuario",
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', meta: { resource: 'Panel Usuario', mode: 'visitante' }, component: () => import('pages/HomeUser.vue') },
      { path: '/panel-usuario/create', meta: { resource: 'Panel Usuario', mode: 'Crear' }, component: () => import('src/modules/Visitas/Create.vue') },
      { path: '/panel-usuario/update/:id', meta: { resource: 'Panel Usuario', mode: 'Actualizar' }, component: () => import('src/modules/Visitas/Update.vue') },
      { path: '/panel-usuario/show/:id', meta: { resource: 'Panel Usuario', mode: 'Ver' }, component: () => import('src/modules/Visitas/Show.vue') }
    ]
  },
  {
    path: "/panel-admin",
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', meta: { resource: 'Panel Administrador', mode: 'Tabla' }, component: () => import('pages/HomeAdmin.vue') },

      { path: '/panel-admin/usuario', meta: { resource: 'Panel Administrador', mode: 'user' }, component: () => import('src/modules/Usuario/index.vue') },
      { path: '/panel-admin/usuario/create', meta: { resource: 'Panel Administrador', mode: 'Crear' }, component: () => import('src/modules/Usuario/Create.vue') },
      { path: '/panel-admin/usuario/update/:id', meta: { resource: 'Panel Administrador', mode: 'Actualizar' }, component: () => import('src/modules/Usuario/Update.vue') },
      { path: '/panel-admin/usuario/show/:id', meta: { resource: 'Panel Administrador', mode: 'Ver' }, component: () => import('src/modules/Usuario/Show.vue') },

      { path: '/panel-admin/visitas', meta: { resource: 'Panel Administrador', mode: 'user' }, component: () => import('pages/HomeUser.vue') },
      { path: '/panel-admin/visitas/create', meta: { resource: 'Panel Administrador', mode: 'Crear' }, component: () => import('src/modules/Visitas/Create.vue') },
      { path: '/panel-admin/visitas/update/:id', meta: { resource: 'Panel Administrador', mode: 'Actualizar' }, component: () => import('src/modules/Visitas/Update.vue') },
      { path: '/panel-admin/visitas/show/:id', meta: { resource: 'Panel Administrador', mode: 'Ver' }, component: () => import('src/modules/Visitas/Show.vue') },


    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
