import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

const Home = () => import("@/views/Home");
const Error404 = () => import("@/views/Error/404");
const Error401 = () => import("@/views/Error/401");

Vue.use(VueRouter);

// 解决报错
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch((err) => err);
};
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch((err) => err);
};

// 创建默认路由
const createRouter = () =>
    new VueRouter({
        // mode: 'history',
        base: "/", // 打包时需要配置访问目录
        routes: [
            {
                path: "/",
                redirect: "/home"
            },
            {
                path: "/home",
                name: "home",
                meta: { title: "home", requiresAuth: false },
                component: Home
            },
            {
                path: "/notFound",
                meta: { title: "401", requiresAuth: false },
                component: Error401
            }
        ]
    });

let router = createRouter();

/*
    路由导航守卫
    to 要跳转到哪个界面
    from 从哪跳转来的
    next 是否要放行
*/
router.beforeEach((to, from, next) => {
    let title = to.meta.title || "";
    window.document.title = title ? `${title} - demo` : "demo";
    window.sessionStorage.setItem("activePath", to.path);
    if (to.path === "/login" || to.path === "/register") {
        // 如果是要跳转登录就直接放行
        next();
    } else {
        // 检查路由元信息，是否开启登录验证
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            // 判断用户是否已经登录
            const { token } = store.state.user.userInfo;
            if (!token) {
                // 没登陆还是跳转登录页
                next("/notFound");
            } else {
                // 正常情况就放行,设置当前路由地址
                window.sessionStorage.setItem("activePath", to.path);
                next();
            }
        } else {
            // 没开启登录验证，放行
            next();
        }
    }
});

// 动态导入路由
export function initRoutes() {
    const { navList } = store.state.user;
    let currentRoutes = router.options.routes; // 获取要添加路由的当前路由
    // 存在需要导入的路由
    if (navList && navList.length > 0) {
        // 第一层为系统层
        navList.forEach((item, index) => {
            const main = "/" + item.code;
            // 判断系统目录是否存在
            if (ruleMapping.hasOwnProperty(main)) {
                // 存在既为当前系统的菜单内容
                let currentIndex = { path: main, component: ruleMapping[main].component, children: [] };
                // 判断重定向路径
                if (item.children && item.children.length > 0) {
                    currentIndex["redirect"] = main + "/" + item.children[0].code;
                }

                // 循环添加模块的路由
                let childNavList = item.children;
                childNavList.forEach((item2, index2) => {
                    let item2main = `${main}/${item2.code}`;
                    // 判断模块是否有子内容
                    if (!item2.children || (item2.children && item2.children.length === 0)) {
                        // 不包含子内容
                        if (ruleMapping.hasOwnProperty(item2main)) {
                            // 判断存在路由页面才创建
                            currentIndex.children.push({
                                path: item2main,
                                component: ruleMapping[item2main].component,
                                meta: {
                                    title: item2.name,
                                    requiresAuth: true
                                }
                            });
                        }
                    } else {
                        if (item2.children[0].type !== "ST") {
                            // 不是视图，包含的是子菜单或子按钮，直接将按钮等放到页面参数中，不将子级作为路由创建
                            if (ruleMapping.hasOwnProperty(item2main)) {
                                currentIndex.children.push({
                                    path: item2main,
                                    component: ruleMapping[item2main].component,
                                    meta: {
                                        title: item2.name,
                                        requiresAuth: true
                                    }
                                });
                            }
                        } else {
                            // 包含子视图，既type=20
                            // 获取该模块第一个视图
                            let firstPath = `${item2main}/${item2.children[0].code}`;
                            // 添加父级路由
                            let currentIndex2 = {
                                path: item2main,
                                meta: {
                                    title: item2.name,
                                    requiresAuth: true
                                },
                                redirect: firstPath,
                                children: []
                            };

                            if (ruleMapping.hasOwnProperty(item2main)) {
                                currentIndex2["component"] = ruleMapping[item2main].component;
                            }

                            // 添加子路由
                            item2.children.forEach((item3, index3) => {
                                let item3main = `${item2main}/${item3.code}`;
                                // 获取需要动态添加的路由，对应的跳转页面配置
                                if (ruleMapping.hasOwnProperty(item3main)) {
                                    let temp = ruleMapping[item3main];
                                    // 将接口返回的路由对应的权限赋给当前路由（在按钮权限控制时使用）
                                    temp.meta["title"] = item3.name;
                                    // 将匹配的路由，添加到当前路由的对应子路由位置
                                    currentIndex2.children.push(temp);
                                }
                            });

                            currentIndex.children.push(currentIndex2);
                        }
                    }
                });
                // 执行动态添加路由方法，完成动态路由添加
                currentRoutes.push(currentIndex);
                let list = [...currentRoutes];
                for (let i = 0; i < list.length; i++) {
                    router.addRoute(list[i]);
                }
            }
        });
    }

    router.addRoute({
        path: "*",
        meta: { title: "404", requiresAuth: false },
        component: Error404
    });
}

// 重置路由（退出登录，切换账号）
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // the relevant part
    router.options = newRouter.options;
}

export default router;
