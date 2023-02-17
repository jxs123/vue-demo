<!--
 * @Description: 401
 * @Author: jinxiaoshan
 * @Date: 2022-03-01 08:43:33
-->
<template>
    <div class="page-error">
        <div class="error-title1">401</div>
        <div class="error-title2">哎呀，您没有该页面的访问权限~</div>
        <div class="error-btn"><span @click="$router.back(-1)">返回上页</span>|<span @click="$router.push('/')">去登录</span></div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {},
    methods: {}
};
</script>

<style scoped>
.page-error {
    padding-top: 30vh;
    text-align: center;
}
.error-title1 {
    position: relative;
    font-size: 16.4vh;
    background-image: linear-gradient(180deg, #0a2463, #010747);
    -webkit-background-clip: text;
    color: transparent;
}

.error-title2 {
    height: 1.8vh;
    line-height: 1.8vh;
    font-size: 1.8vh;
    margin-bottom: 1.8vh;
    color: #888;
}
.error-btn {
    font-size: 1.4vh;
    color: #999;
}
.error-btn span {
    cursor: pointer;
    color: #179cfb;
    display: inline-block;
    margin: 0 1vh;
    vertical-align: middle;
}
</style>
