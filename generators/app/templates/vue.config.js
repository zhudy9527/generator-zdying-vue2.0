const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath: '/',
    lintOnSave: false,
    runtimeCompiler: true, //关键点在这
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
            // less: {
            //     prependData: `@import "@/assets/css/variable.less";`,
            // },
        },
    },
};
