import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => {
        throw '路由出错了：：' + err
    });
};
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
        },
        {
            path: '/layout',
            name: 'layout',
            redirect: '/home',
            component: () => import(/* webpackChunkName: "login" */ '@/layout/index.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "login" */ '@/views/home/index.vue'),
                },
            ]
        },
    ],
});

export default router;
