/*
 * @Description: 登录模块
 * @Author: jinxiaoshan
 * @Date: 2022-06-10 15:10:31
 */
import { get, post, deletefn, put } from "../http";

const userApi = {
    //map01-请求WFS
    addGeoJson(name) {
        return get(process.env.VUE_MAP_SERVER + `/geoserver/weixian/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=weixian%3A${name}&maxFeatures=50&outputFormat=application%2Fjson`);
    }
};
export default userApi;
