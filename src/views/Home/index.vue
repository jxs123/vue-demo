<!--
 * @Description: 头部
 * @Author: jinxiaoshan
 * @Date: 2023-02-18 07:11:54
 * @LastEditors: jinxiaoshan
 * @LastEditTime: 2023-02-18 12:07:34
-->
<template>
    <el-container class="container-box">
        <el-header height="70px">
            <header-bar></header-bar>
        </el-header>
        <el-main>
            <div class="flex-column h-100">
                <el-row class="flex-1 p-l-20 p-r-20">
                    <el-col :span="24" class="h-100">
                        <product-lines-table />
                    </el-col>
                </el-row>
                <el-row class="flex-1 p-l-20 p-r-20" :gutter="20">
                    <el-col :span="8" class="h-100">
                        <speed-ec />
                    </el-col>
                    <el-col :span="8" class="h-100">
                        <duration-ec />
                    </el-col>
                    <el-col :span="8" class="h-100">
                        <min-duration-ec />
                    </el-col>
                </el-row>
                <el-row class="flex-1 p-l-20 p-r-20" :gutter="20">
                    <el-col :span="16" class="h-100">
                        <project-table />
                    </el-col>
                    <el-col :span="8" class="h-100">
                        <job-info-ec />
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import HeaderBar from "./component/HeaderBar";
// 表格
import ProductLinesTable from "./component/ProductLinesTable";
import ProjectTable from "./component/ProjectTable";
// 图表
import SpeedEc from "./component/SpeedEc";
import DurationEc from "./component/DurationEc";
import MinDurationEc from "./component/MinDurationEc";
import JobInfoEc from "./component/JobInfoEc";
export default {
    components: {
        HeaderBar,
        ProductLinesTable,
        ProjectTable,
        SpeedEc,
        DurationEc,
        MinDurationEc,
        JobInfoEc
    },
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
.container-box {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden !important;
    background-color: #020e34;
    color: #fff;
}
</style>
