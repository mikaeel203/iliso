import {createRouter,createWebHistory} from 'vue-router'

import LoginPage from '@/components/LoginPage.vue'
import DashboardPage from '@/components/DashboardPage.vue'
import ForgotPassword from '@/components/ForgotPassword.vue';
import ResetPassword from '@/components/ResetPassword.vue'
const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginPage
    },
    { path: '/forgot-password', 
      component: ForgotPassword 
    },
    { path: '/reset-password', 
      component: ResetPassword 
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router