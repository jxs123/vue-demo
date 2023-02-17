/*
 * @Description: 用户信息
 * @Author: jinxiaoshan
 * @Date: 2022-06-10 15:06:19
 */
import { resetRouter, initRoutes } from "@/router";
import userApi from "@/api/modules/user";

import md5 from "js-md5";
import { getNavList, setNavList, removeNavList, getUserInfo, setUserInfo, removeUserInfo } from "@/utils/auth/users";

const state = {
    userInfo: getUserInfo(),
    // 用户权限原始数据，用于生成路由
    navList: getNavList()
};

const mutations = {
    SET_USERINFO: (state, data) => {
        state.userInfo = data;
        setUserInfo(data);
    },
    SET_NAVLIST: (state, data) => {
        state.navList = data;
        setNavList(data);
    }
};

const actions = {
    // 用户登录
    login({ commit, dispatch }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            const params = { username: username.trim(), password: md5(password) };
            // userApi
            //     .login(params)
            //     .then(async (res) => {
            let res = {
                success: true,
                result: {
                    id: "1",
                    nickname: "管理员",
                    roleList: [{ role: "admin" }]
                },
                token: "123456789",
                error: ""
            };
            if (res.success) {
                let resData = res.result;
                // 用户信息
                let role = resData.roleList[0].role;
                let userInfo = {
                    username: username,
                    userid: resData.id,
                    token: res.token,
                    nickname: resData.nickname,
                    role: role
                };
                commit("SET_USERINFO", userInfo);

                // 权限菜单，一个选项的下一级必须全部都是同级选项
                dispatch("getNav", { role: role }).then((res) => {
                    resolve("/" + res);
                });
            } else {
                reject(res.error);
            }
            // })
            // .catch((err) => {
            //     reject("登录失败！");
            // });
        });
    },
    /* 获取菜单 */
    getNav({ commit }, data) {
        return new Promise((resolve) => {
            let navList = [
                {
                    id: "1",
                    name: "web系统",
                    code: "qwsy",
                    type: "XT",
                    children: [
                        {
                            id: "2",
                            name: "综合信息可视化",
                            code: "home",
                            type: "MK",
                            children: []
                        },
                        {
                            id: "3",
                            name: "专题可视化",
                            code: "special",
                            type: "MK",
                            children: [
                                {
                                    id: "31",
                                    name: "防汛专题",
                                    code: "flood",
                                    icon: "icondangan1",
                                    type: "ST",
                                    color: "#E9AC31",
                                    children: []
                                },
                                {
                                    id: "32",
                                    name: "水雨情专题",
                                    code: "rain",
                                    icon: "iconzhandian",
                                    type: "ST",
                                    color: "#1EAE78",
                                    children: []
                                },
                                {
                                    id: "33",
                                    name: "告警专题",
                                    code: "warning",
                                    icon: "iconzhabeng",
                                    type: "ST",
                                    color: "#2F82EB",
                                    children: []
                                },
                                {
                                    id: "34",
                                    name: "无人机专题",
                                    code: "uva",
                                    icon: "iconzhabeng",
                                    type: "ST",
                                    color: "#2F82EB",
                                    children: []
                                }
                            ]
                        },
                        {
                            id: "4",
                            name: "水网管理",
                            code: "water",
                            type: "MK",
                            children: [
                                {
                                    id: "41",
                                    name: "水网档案",
                                    code: "files",
                                    icon: "icondangan1",
                                    type: "ST",
                                    color: "#E9AC31",
                                    children: []
                                },
                                {
                                    id: "42",
                                    name: "站点",
                                    code: "site",
                                    icon: "iconzhandian",
                                    type: "ST",
                                    color: "#1EAE78",
                                    children: []
                                },
                                {
                                    id: "43",
                                    name: "闸泵",
                                    code: "pump",
                                    icon: "iconzhabeng",
                                    type: "ST",
                                    color: "#2F82EB",
                                    children: []
                                },
                                {
                                    id: "44",
                                    name: "无人机",
                                    code: "uav",
                                    icon: "iconwurenji",
                                    type: "ST",
                                    color: "#FF9841",
                                    children: []
                                },
                                {
                                    id: "45",
                                    name: "摄像头",
                                    code: "camera",
                                    icon: "iconjiankong",
                                    type: "ST",
                                    color: "#00DCFF",
                                    children: []
                                },
                                {
                                    id: "46",
                                    name: "报警事件",
                                    code: "alarm",
                                    icon: "iconbaojing",
                                    type: "ST",
                                    color: "#F2DE2F",
                                    children: []
                                },
                                {
                                    id: "47",
                                    name: "预警事件",
                                    code: "warning",
                                    icon: "iconyujing",
                                    type: "ST",
                                    color: "#E64F4F",
                                    children: []
                                }
                            ]
                        },
                        {
                            id: "5",
                            name: "涉水事件管理",
                            code: "event",
                            type: "MK",
                            children: [
                                {
                                    id: "51",
                                    name: "异常行为",
                                    code: "error",
                                    icon: "iconshangbao",
                                    type: "ST",
                                    color: "#E9AC31",
                                    children: []
                                },
                                {
                                    id: "52",
                                    name: "河道破坏",
                                    code: "destroy",
                                    icon: "iconhedao",
                                    type: "ST",
                                    color: "#0095FF",
                                    children: []
                                },
                                {
                                    id: "53",
                                    name: "洪涝事件",
                                    code: "flood",
                                    icon: "iconhonglao",
                                    color: "#1EAE78",
                                    type: "ST",
                                    children: []
                                }
                            ]
                        },
                        {
                            id: "6",
                            name: "系统管理",
                            code: "system",
                            type: "MK",
                            children: [
                                {
                                    id: "61",
                                    name: "用户管理",
                                    code: "user",
                                    icon: "iconyonghu",
                                    type: "ST",
                                    color: "#FFB726",
                                    children: []
                                },
                                {
                                    id: "62",
                                    name: "部门管理",
                                    code: "department",
                                    icon: "iconbumen",
                                    type: "ST",
                                    color: "#0095FF",
                                    children: []
                                },
                                {
                                    id: "63",
                                    name: "权限管理",
                                    code: "role",
                                    icon: "iconlock",
                                    color: "#1EAE78",
                                    type: "ST",
                                    children: []
                                },
                                {
                                    id: "64",
                                    name: "日志管理",
                                    code: "log",
                                    icon: "iconrizhi1",
                                    color: "#F16767",
                                    type: "ST",
                                    children: []
                                }
                            ]
                        }
                    ]
                }
            ];

            commit("SET_NAVLIST", navList);
            initRoutes();
            resolve(navList[0].code);
        });
    },
    // 重置缓存信息
    resetInfo({ commit }) {
        commit("SET_USERINFO", {
            username: "",
            userid: "",
            token: "",
            nickname: "",
            head: "",
            role: ""
        });
        commit("SET_NAVLIST", []);
        resetRouter();
    },

    // 退出登录
    logout() {
        return new Promise((resolve, reject) => {
            userApi
                .logout()
                .then(async (res) => {
                    removeUserInfo();
                    removeNavList();
                    resolve(true);
                })
                .catch((err) => {
                    reject(false);
                });
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
