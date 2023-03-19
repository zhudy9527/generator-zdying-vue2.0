/* 不同环境，不同俱乐部配置文件，根据  process.env.VUE_APP_NODE ||  process.env.VUE_APP_AUDIENCE  判断 */
// 本地调试地址，方便开发使用
// 打包时可不注释此处，不受影响
let localUrl = 'https://api.acme-ai.com/teamup-elite'; // 正式地址

// oss公共目录url
let baseURL = {
    // 在本地开发时，localUrl 存在时走 localUrl，localUrl 不存在时走 testing 的 VUE_APP_BASEURL，此时可以启动多个项目
    development: localUrl ? localUrl : process.env.VUE_APP_BASEURL,
    // testing 环境
    testing: process.env.VUE_APP_BASEURL,
    // production 环境
    production: process.env.VUE_APP_BASEURL,
};

// 暴露JS层面的内容
export default {
    BASE_URL: baseURL[process.env.NODE_ENV], // 不同环境接口地址
};
