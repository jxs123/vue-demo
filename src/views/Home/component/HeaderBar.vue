<!--
 * @Description: 头部
 * @Author: jinxiaoshan
 * @Date: 2023-02-18 07:11:54
 * @LastEditors: jinxiaoshan
 * @LastEditTime: 2023-02-18 09:32:37
-->
<template>
    <div class="flex align-center header-box">
        <div class="header-title">交检准时率（指标负责人/部门：于亦刚/质量管理部）</div>
        <div class="flex-1 header-time">
            <span>{{ dateTime }}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timer: null,
            dateTime: ""
        };
    },
    created() {
        this.setDateTime();
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
            this.setDateTime();
        }, 1000);
    },
    mounted() {},
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    methods: {
        setDateTime() {
            let time = new Date().getTime();
            this.dateTime = this.textFormat(time, "YYYY-M-D AAAA HH:mm:ss");
        }
    }
};
</script>

<style lang="scss" scoped>
.header-box {
    height: 100%;
    padding: 0 20px;
    background-color: var(--el-color-primary);
    .header-title {
        font-size: 24px;
        color: #fff;
    }
    .header-time {
        text-align: right;
        font-size: 16px;
        color: #accafb;
    }
}
</style>
