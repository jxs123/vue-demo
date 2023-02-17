<!--
 * @Description: 天气
 * @Date: 2022-11-21 15:04:23
-->
<template>
    <div class="weather-box">
        <i class="iconfont iconxiaoyu"></i>
        降雨预报：3:00-14:00&nbsp;全县有小到中雨
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.weather-box {
    position: absolute;
    left: 378px;
    top: 0;
    min-width: 360px;
    height: 34px;
    line-height: 34px;
    padding: 0 40px 0 10px;
    background: linear-gradient(90deg, rgba(0, 40, 119, 0.3) 0%, rgba(0, 23, 90, 0.3) 100%);
    color: #f6f6f6;
    i {
        color: #94b0ff;
        margin-right: 4px;
    }
}
</style>
