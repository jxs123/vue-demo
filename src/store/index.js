/*
 * @Description:
 * @Author: jinxiaoshan
 * @Date: 2022-06-10 09:46:53
 */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

const store = new Vuex.Store({
    modules,
    getters
});

export default store;
