<!--
 * @Description: 首页
 * @Author: jinxiaoshan
 * @Date: 2022-06-10 14:45:46
-->
<template>
    <div class="layer-box flex-column">
        <HeaderBar></HeaderBar>
        <router-view class="flex-1"></router-view>
    </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar";
export default {
    data() {
        return {};
    },
    components: {
        HeaderBar
    }
};
</script>

<style lang="scss" scoped>
.layer-box {
    width: 100%;
    height: 100%;
}
</style>
