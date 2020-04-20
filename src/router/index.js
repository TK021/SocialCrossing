import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Hangouts from '@/components/Hangouts/Hangouts'
import CreateHangouts from '@/components/Hangouts/CreateHangouts'
import Profile from '@/components/User/Profile'
import About from '@/components/User/About'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import TestPage from '@/components/User/TestPage'
import Hangout from '@/components/Hangouts/Hangout'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/hangouts',
            name: 'Hangouts',
            component: Hangouts
        },  
        {
            path: '/newhangouts/create',
            name: 'CreateHangout',
            component: CreateHangouts,
            beforeEnter: AuthGuard
        },
        {
            path: '/hangouts/:id',
            name: 'Hangout',
            props: true,
            component: Hangout
        },
        {
            path: '/profile/user',
            name: 'Profile',
            component: Profile,
            beforeEnter: AuthGuard
        },
        {
            path: '/profile/about',
            name: 'About',
            component: About,
            beforeEnter: AuthGuard
        },
        {
            path: '/profile/signin',
            name: 'Signin',
            component: Signin
        },
        {
            path: '/profile/signup',
            name: 'Signup',
            component: Signup
        },        
        {
            path: '/profile/test',
            name: 'Test',
            component: TestPage
        }
        
    ],
    mode: 'history'
})