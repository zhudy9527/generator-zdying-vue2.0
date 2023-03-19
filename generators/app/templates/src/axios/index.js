import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import config from './config'; // 这里设置了一个文件作为所有请求的基础ip地址
import Router from '../router';
import store from '../store';
const overtime = 30000; // 过期时间
let axiosCount = 0; // 正在请求的url数量

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        if (!config.handleLoadingBySelf) {
            startLoading(); // 开启loading
        }
        // 设置请求头 -- token
        if (store.state.token) {
            config.headers.Authorization = 'Bearer ' + store.state.token;
        }
        // FormData 传参，序列化参数
        if (config.paramsType === 'FormData') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            config.data = qs.stringify(config.data);
        } else {
            // ... 自定义
        }
        return config;
    },
    (error) => {
        endLoading(); // 关闭loading
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        endLoading(); // 关闭loading
        const res = response.data;
        let handleTipsBySelf = response.config.handleTipsBySelf;

        if (handleTipsBySelf) {
            return res; // 如果需要自己处理报错信息，则返回原值，反之报错提示无返回值。
        }

        if (res.code === 200) {
            return res; // 正常code为200时候返回信息
        } else {
            return errorInfo(res); // 报错信息
        }
    },
    (error) => {
        endLoading(); // 关闭loading
        return Promise.reject(error);
    }
);

// 错误 code 处理
function errorInfo(res) {
    switch (res.code) {
        case 400:
            messageInfo(res.message);
            break;
        case 401:
            messageInfo('登录已过期');
            setTimeout(() => {
                Router.push('/login');
            }, 500);
            break;
        case 403:
            messageInfo('您没有此权限');
            break;
        default:
            messageInfo('当前服务不可用');
            break;
    }
}
// message 消息函数
function messageInfo(message) {
    Message({
        message: message,
        type: 'error',
    });
}
// 开启loading
function startLoading() {
    if (axiosCount <= 0) {
        axiosCount = 0;
        store.commit('setLoading', true);
    }
    axiosCount++;
    setTimeout(() => {
        // 接口超时，关闭loading
        store.commit('setLoading', false);
    }, overtime);
}
// 关闭loading
function endLoading() {
    axiosCount--;
    if (axiosCount <= 0) {
        axiosCount = 0;
        store.commit('setLoading', false);
    }
}
export default function(
    url,
    {
        method = 'get',
        timeout = overtime,
        data = {},
        params = {},
        paramsType = '',
        cancelToken = '',
        handleTipsBySelf = false,
        handleLoadingBySelf = false,
        baseURL = config.BASE_URL,
        tenant = true,
        headers = {
            'Content-Type': 'application/json', // json请求头
        },
        responseType = 'json',
    }
) {
    const config = {
        method, // 请求方式
        timeout, // 请求时间
        url, // 如果URL是完整的，包含域名，则下方的域名不会被拼接
        baseURL, // 接口前缀url，默认为空，为空的情况```axios.defaults.baseURL = config.BASE_URL;```会生效
        data, // body 传参
        paramsType, // 其他传参方式，如 value有 FormData 传参等
        params, // url 传参
        handleTipsBySelf, // 是否自己处理返回值，可能会根据后台返回不用的code做不同的处理。使用查看./server.js login_email方法
        handleLoadingBySelf, // 设置为true时，不用弹loading，静默请求，或者在组件内处理loading。默认为false。
        cancelToken: cancelToken, // 关闭请求
        headers, // 请求头
        responseType, // 返回格式
        tenant, // 是否含有tenant
    };
    return axios(config);
}
