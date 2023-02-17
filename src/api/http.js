import axios from "axios";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
import router from "@/router";

// 声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;
let errorNum = 0;

function showFullScreenLoading() {
    needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) {
        return false;
    }
    needLoadingRequestCount--;
}

// 异常提示
const codeMessage = {
    200: "服务器成功返回请求的数据",
    201: "新建或修改数据成功",
    202: "一个请求已经进入后台排队（异步任务）",
    204: "删除数据成功",
    400: "发出的请求有错误",
    401: "登录超时",
    403: "用户得到授权，但是访问是被禁止的",
    404: "网络请求不存在",
    406: "请求的格式不可得",
    408: "请求失败了",
    410: "请求的资源被永久删除，且不会再得到的",
    422: "当创建一个对象时，发生一个验证错误",
    500: "服务器发生错误",
    502: "网关错误",
    503: "服务不可用，服务器暂时过载或维护",
    504: "网关超时"
};

// 设置请求超时时间
let hostname = window.location.hostname;
if (hostname === "localhost") {
    axios.defaults.timeout = 1000 * 60 * 10;
} else {
    axios.defaults.timeout = 1000 * 60;
}

window.axiosCancel = []; // 全局定义一个存放取消请求的标识
// 请求拦截
axios.interceptors.request.use(
    (config) => {
        if (config.method === "delete") {
            config.headers["Content-Type"] = "application/json;charset=UTF-8";
        } else if (config.method === "get") {
            config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        } else if (config.method === "post") {
            if (Object.prototype.toString.call(config.data) != "[object FormData]") {
                // 请求拦截器处理
                config.headers["Content-Type"] = "application/json;charset=UTF-8";
            } else {
                config.headers["Content-Type"] = "multipart/form-data";
            }
            // application/x-www-form-urlencoded
        }

        // 在发送请求之前做些什么 验证token之类的
        showFullScreenLoading();

        let remToken = ["/api/admin/user/login", "/geoserver/weixian/"];
        let isrem = remToken.find((item) => config.url.indexOf(item) != -1);
        if (!isrem) {
            let token = store.state.user.userInfo.token;
            if (token) {
                config.headers["x-auth-token"] = `${token}`;
            }
        }
        NProgress.start();
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        if (errorNum == 0) {
            errorNum = 1;
            Message({
                message: codeMessage[error.response.status],
                type: "error"
            });
            setTimeout(() => {
                errorNum = 0;
            }, 2000);
        }
        return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        NProgress.done();
        tryHideFullScreenLoading();

        switch (response.status) {
            case 401:
                if (errorNum == 0) {
                    errorNum = 1;
                    Message({
                        message: codeMessage[response.status],
                        type: "error"
                    });
                    setTimeout(() => {
                        errorNum = 0;
                    }, 2000);
                }
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
                break;
            case 200:
                return response;
            default:
                if (errorNum == 0) {
                    errorNum = 1;
                    Message({
                        message: codeMessage[response.status],
                        type: "error"
                    });
                    setTimeout(() => {
                        errorNum = 0;
                    }, 2000);
                }
                return false;
        }
    },
    (error) => {
        // 对响应错误做点什么
        tryHideFullScreenLoading();
        NProgress.done();
        if (error && error.response) {
            if (error.response.status == 401) {
                if (errorNum == 0) {
                    errorNum = 1;
                    Message({
                        message: codeMessage[error.response.status],
                        type: "error"
                    });
                    setTimeout(() => {
                        errorNum = 0;
                    }, 2000);
                }
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                if (errorNum == 0) {
                    errorNum = 1;
                    Message({
                        message: codeMessage[error.response.status],
                        type: "error"
                    });
                    setTimeout(() => {
                        errorNum = 0;
                    }, 2000);
                }
            }
        } else {
            if (errorNum == 0) {
                errorNum = 1;
                Message({
                    message: "请求异常",
                    type: "error"
                });
                setTimeout(() => {
                    errorNum = 0;
                }, 2000);
            }
        }

        return Promise.reject(error);
    }
);

// 封装get方法和post方法

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    // 设置post请求头
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then((res) => {
                resolve(res.data);
                // Loading.service(true).close();
                // Message({message: '请求成功', type: 'success'});
            })
            .catch((err) => {
                reject(err);
            });
    });
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function download(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
                responseType: "blob"
            })
            .then((res) => {
                resolve(res.data);
                // Loading.service(true).close();
                // Message({message: '请求成功', type: 'success'});
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then((res) => {
                let isLogin = url.substring(url.length - 5, url.length);
                if (isLogin === "login") {
                    var token = res.headers["x-auth-token"];
                    res.data.token = token;
                    resolve(res.data);
                } else {
                    resolve(res.data);
                }
                // Loading.service(true).close();
                // Message({message: '请求成功', type: 'success'});
            })
            .catch((err) => {
                reject(err);
                // Loading.service(true).close();
            });
    });
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .put(url, params)
            .then((res) => {
                resolve(res.data);
                // Loading.service(true).close();
                // Message({message: '请求成功', type: 'success'});
            })
            .catch((err) => {
                reject(err);
                // Loading.service(true).close();
            });
    });
}

/**
 * delete
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function deletefn(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, { data: params })
            .then((res) => {
                resolve(res.data);
                // Loading.service(true).close();
                // Message({message: '请求成功', type: 'success'});
            })
            .catch((err) => {
                // reject(err.data)
                // Loading.service(true).close();
            });
    });
}
