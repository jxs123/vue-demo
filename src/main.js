/*
 * @Description: 入口
 * @Author: jinxiaoshan
 * @Date: 2022-06-10 09:47:12
 */
import Vue from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueBus from "vue-bus"; // 兄弟组件之间通信
import "./assets/iconfont/iconfont";
import "./plugins/element.js";
import "./plugins/vue-cookies";
import "./plugins/fmt";
import animate from "animate.css";
import "./lib/flexible"; // 分辨率兼容
import api from "@/api/index";
import * as echarts from "echarts";

Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.config.productionTip = false;
Vue.use(VueBus);
Vue.use(animate);
Vue.prototype.$echarts = echarts;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app");
