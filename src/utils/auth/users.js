/*
 * @Description: 存取缓存信息
 * @Author: jinxiaoshan
 * @Date: 2022-06-10 15:58:48
 */
const navkey = "qwsy-nav";
const userinfoKey = "qwsy-user-info";

// 路由菜单
export function getNavList() {
    let value = localStorage.getItem(navkey || "[]");
    if (value == "" || value == null || value == "undefined") {
        return [];
    } else {
        return JSON.parse(value);
    }
}
export function setNavList(data) {
    localStorage.setItem(navkey, JSON.stringify(data));
}
export function removeNavList() {
    localStorage.removeItem(navkey);
}

// 用户信息
export function getUserInfo() {
    let value = localStorage.getItem(userinfoKey || "{}");
    if (value == "" || value == null || value == "undefined") {
        return {
            username: "",
            userid: "",
            token: "",
            nickname: "",
            head: "",
            role: ""
        };
    } else {
        return JSON.parse(value);
    }
}
export function setUserInfo(data) {
    localStorage.setItem(userinfoKey, JSON.stringify(data));
}
export function removeUserInfo() {
    localStorage.removeItem(userinfoKey);
}
