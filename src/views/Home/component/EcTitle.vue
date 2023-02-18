<!--
 * @Description: 头部
 * @Author: jinxiaoshan
 * @Date: 2023-02-18 07:11:54
 * @LastEditors: jinxiaoshan
 * @LastEditTime: 2023-02-18 12:00:55
-->
<template>
    <div class="home-ec-title">{{ title }}</div>
</template>

<script>
export default {
    props: ["title"],
    data() {
        return {
            timer: null,
            dateTime: ""
        };
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.home-ec-title {
    height: 30px;
    line-height: 30px;
    background-color: var(--el-color-primary);
    border-left: 4px solid var(--ec-boder-color);
    font-size: 15px;
    &:before {
        content: "";
        display: inline-block;
        margin: 0 4px;
        border: 5px solid transparent;
        border-right: 0;
        border-left-color: #cbbf54;
    }
}
</style>
