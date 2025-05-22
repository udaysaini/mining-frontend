import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from './views/DashboardView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      title: 'Dashboard - Field Operations'
    }
  },
  {
    path: '/technicians',
    name: 'technicians',
    component: () => import('./views/TechniciansView.vue'),
    meta: {
      title: 'Technicians - Field Operations'
    }
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import('./views/EquipmentView.vue'),
    meta: {
      title: 'Equipment - Field Operations'
    }
  },
  {
    path: '/shifts',
    name: 'shifts',
    component: () => import('./views/ShiftsView.vue'),
    meta: {
      title: 'Shifts - Field Operations'
    }
  },
//   {
//     path: '/reports',
//     name: 'reports',
//     component: () => import('./views/ReportsView.vue'),
//     meta: {
//       title: 'Reports - Field Operations'
//     }
//   }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update page title based on route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Field Operations Dashboard'
  next()
})

export default router
