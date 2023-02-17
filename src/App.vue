<!--
 * @Description: 
 * @Author: jinxiaoshan
 * @Date: 2022-06-10 09:47:12
-->
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { initRoutes } from "@/router/index.js"; // 按需引入路由的动态注入方法
export default {
    created() {
        initRoutes();
    }
};
</script>

<style>
@import url("./assets/iconfont/iconfont.css");
@import url("./assets/iconfont/iconsvg.css");
#app {
    height: 100vh;
    overflow: hidden;
}
</style>
