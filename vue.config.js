module.exports = {
    // 基本路径
    // 打包时改为./
    // publicPath: '/',
    publicPath: "./",

    // 输出文件目录
    outputDir: "dist",
    assetsDir: "assets",

    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config) => {
        config.module
            .rule("css")
            .test(/\.css$/)
            .oneOf("vue")
            .resourceQuery(/\?vue/)
            .use("px2rem")
            .loader("px2rem-loader")
            .options({ remUnit: 192 })
            .end();
        config.plugin("html").tap((args) => {
            args[0].title = "demo";
            return args;
        });
    },
    configureWebpack: () => {},

    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,

    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: false,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-plugin-px2rem")({
                        rootValue: 192, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                        // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                        //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                        // propBlackList: [], //黑名单
                        exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        selectorBlackList: [".no-rem-"], //要忽略并保留为px的选择器
                        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                        mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    })
                ]
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        // modules: false
        requireModuleExtension: true
    },

    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require("os").cpus().length > 1,

    // webpack-dev-server 相关配置
    devServer: {
        open: true,
        host: "127.0.0.1", // 打包时改为 127.0.0.1
        port: process.env.NODE_ENV === "development" ? 9091 : 28190,
        https: false,
        hotOnly: false,
        proxy: {
            "/api": {
                target: process.env.VUE_APP_URL,
                changeOrigin: true, //虚拟服务器收发请求，解决跨域
                ws: true, // 是否代理websockets
                secure: false, // 是否https
                pathRewrite: {
                    "^/api ": "/api"
                }
            },
            //geoserver
            "/geoserver": {
                target: process.env.VUE_APP_MAP_SERVER,
                changeOrigin: true, //虚拟服务器收发请求，解决跨域
                ws: true, // 是否代理websockets
                secure: false, // 是否https
                pathRewrite: {
                    "^/geoserver": "/geoserver"
                }
            }
        },
        before: (app) => {}
    },

    configureWebpack: (config) => {
        // if (process.env.NODE_ENV === "production") {
        //     // 为生产环境修改配置...
        //     config.mode = "production";
        //     config["performance"] = {
        //         //打包文件大小配置
        //         maxEntrypointSize: 10000000,
        //         maxAssetSize: 30000000
        //     };
        // }
        config["performance"] = {
            hints: "warning",
            maxEntrypointSize: 40000000,
            //生成文件的最大体积
            maxAssetSize: 20000000,
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith(".js");
            }
        };
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    },

    lintOnSave: false
};
