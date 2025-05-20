import {createRouter, createWebHistory} from 'vue-router'

import TechniciansView from '../views/TechniciansView.vue'
// import EquipmentView from '@/views/EquipmentView.vue'
// import ShiftsView from '@/views/ShiftsView.vue'

const routes = [
    {
        path: '/',
        redirect: '/technicians'
        // redirect: '/dashboard'
    },
    // {
    //     path: '/dashboard',
    //     name: 'Dashboard',
    //     component: DashboardView
    // },
    {
        path: '/technicians',
        name: 'Technicians',
        component: TechniciansView
    },
    // {
    //     path: '/equipment',
    //     name: 'Equipment',
    //     component: EquipmentView
    // },
    // {
    //     path: '/shifts',
    //     name: 'Shifts',
    //     component: ShiftsView
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router