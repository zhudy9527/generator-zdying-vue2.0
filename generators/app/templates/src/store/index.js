import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    /* 切换账号除copy外不需要重置的state */
    state: {
        loading: false,
        userData:sessionStorage.getItem('userData') || {}, // 用户信息
        token:  sessionStorage.getItem('token') || '', // 登录凭证
        menuList: [
            {
                name: '首页'
            }
        ], // 菜单
    },
    mutations: {
        // 设置 loading
        setLoading(state, data) {
            state.loading = data;
        },
        // 设置 token
        setToken(state, token) {
            state.token = token;
            sessionStorage.setItem('token',token)
        },
        // 设置 userData
        setUserData(state, userData) {
            state.userData = userData;
            sessionStorage.setItem('userData',token)
        },
        // 修改菜单
        changeMenu(state, data) {
            state.menuList = data;
            sessionStorage.setItem('menuList',token)
        },
        
    },
    actions: {
        // 退出登录
        LogOut({ commit }) {
            return new Promise(resolve => {
                commit('setLoading', false);
                commit('setToken', '');
                commit('setUserData', {});
                resolve('success');
            });
        },
    },
});
