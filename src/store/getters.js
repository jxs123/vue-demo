/*
 * @Description: 缓存信息获取
 * @Author: jinxiaoshan
 * @Date: 2022-06-10 15:05:14
 */
const getters = {
    userInfo: (state) => state.user.userInfo,
    navList: (state) => state.user.navList
};
export default getters;
