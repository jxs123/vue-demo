/*
 * @Description: 首页表格状态管理
 * @Author: jinxiaoshan
 * @Date: 2022-06-10 15:06:19
 */
const state = {
    // 产线表格选中项
    productLinesId: "",
    // 项目表格选中项
    projectId: ""
};

const mutations = {
    SET_PRODUCT: (state, data) => {
        state.productLinesId = data;
    },
    SET_PROJECT: (state, data) => {
        state.projectId = data;
    }
};

const actions = {
    // 重置缓存信息
    resetInfo({ commit }) {
        commit("SET_PRODUCT", "");
        commit("SET_PROJECT", "");
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
