import axios from './axios';

const server = {
    loginEmail(data) {
        //邮箱登录
        return axios('/login_email', {
            method: 'post',
            data,
        })
    },
}
export default server;
