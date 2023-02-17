<!--
 * @Description: 图层列表
 * @Date: 2022-11-21 15:04:23
-->
<template>
    <div class="main-info-box layer-box">
        <div class="flex info-label">
            <div class="label-box">
                <div class="label-box-img">
                    <img :src="heliuImg" />
                    <br />
                    河流
                </div>
                <div class="label-box-text">
                    <div><span>数量：</span>{{ conObj.hlnum1 }}条</div>
                    <div><span>长度：</span>{{ conObj.hlnum2 }}km</div>
                    <div><span>面积：</span>{{ conObj.hlnum3 }}km²</div>
                </div>
            </div>
            <div class="label-box">
                <div class="label-box-img">
                    <img :src="jinggaoImg" />
                    <br />
                    告警
                </div>
                <div class="label-box-text">
                    <div class="text-null"></div>
                    <div><span>当前告警：</span>{{ conObj.jgnum1 }}条</div>
                    <div><span>历史告警：</span>{{ conObj.jgnum2 }}条</div>
                    <div class="text-null"></div>
                </div>
            </div>
        </div>
        <el-row class="info-title">
            <el-col :span="8">名称</el-col>
            <el-col :span="5">总计</el-col>
            <el-col :span="5">在线</el-col>
            <el-col :span="5">离线</el-col>
            <el-col :span="1">&nbsp;</el-col>
        </el-row>
        <template v-for="(item, idx) in layerData">
            <el-row :key="idx" class="info-row">
                <el-col :span="8">
                    <span :class="item.show ? '' : 'is-hide'" @click="switchLayer(idx)">
                        <i :class="['iconfont', item.icon]" :style="{ color: item.color }"></i>
                        {{ item.label }}
                    </span>
                </el-col>
                <el-col :span="5">{{ item.sum }}</el-col>
                <el-col :span="5">{{ item.online }}</el-col>
                <el-col :span="5">{{ item.offline }}</el-col>
                <el-col :span="1">&nbsp;</el-col>
            </el-row>
        </template>
    </div>
</template>

<script>
import heliuFile from "@/assets/imgs/index/heliu.png";
import jinggaoFile from "@/assets/imgs/index/jinggao.png";
export default {
    data() {
        return {
            heliuImg: heliuFile,
            jinggaoImg: jinggaoFile,
            conObj: {
                hlnum1: 4,
                hlnum2: 15.33,
                hlnum3: 35.452,
                jgnum1: 3,
                jgnum2: 24
            },
            layerData: []
        };
    },
    created() {
        this.loadLayer();
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        loadLayer() {
            this.layerData = [
                {
                    show: true,
                    icon: "iconshexiangtou",
                    color: "#00DCFF",
                    label: "监控",
                    sum: "48",
                    online: "41",
                    offline: "3"
                },
                {
                    show: true,
                    icon: "iconwurenji",
                    color: "#FF9841",
                    label: "无人机",
                    sum: "46",
                    online: "43",
                    offline: "3"
                },
                {
                    show: true,
                    icon: "iconshuiwen",
                    color: "#FF5DC9",
                    label: "水文站",
                    sum: "53",
                    online: "34",
                    offline: "19"
                },
                {
                    show: true,
                    icon: "iconshuizhi",
                    color: "#FFEB68",
                    label: "水质站",
                    sum: "25",
                    online: "13",
                    offline: "12"
                },
                {
                    show: true,
                    icon: "iconyun",
                    color: "#75FFA5",
                    label: "雨量站",
                    sum: "42",
                    online: "35",
                    offline: "7"
                },
                {
                    show: true,
                    icon: "iconzhabeng",
                    color: "#0095FF",
                    label: "闸口",
                    sum: "16",
                    online: "15",
                    offline: "1"
                }
            ];
        },
        // 切换图层显示隐藏
        switchLayer(idx) {
            let state = this.layerData[idx].show;
            this.layerData[idx].show = !state;
            this.$bus.emit("addFeatureData", this.layerData[idx].label, this.layerData[idx].show);
        }
    }
};
</script>

<style lang="scss" scoped>
.layer-box {
    padding-bottom: 10px;
    border-bottom: 10px solid rgba(255, 255, 255, 0.05);
    .info-label {
        align-items: center;
        padding: 15px 0;
        .label-box {
            width: 50%;
            padding-left: 25px;
            overflow: hidden;
            white-space: nowrap;
            .label-box-img {
                display: inline-block;
                color: #fff;
                font-size: 12px;
                text-align: center;
                vertical-align: top;
                padding-top: 12px;
                img {
                    width: 35px;
                    height: 35px;
                }
            }
            .label-box-text {
                display: inline-block;
                line-height: 27px;
                padding-left: 12px;
                color: var(--el-color-hover);
                font-size: 12px;
                span {
                    color: #99afcc;
                }
                .text-null {
                    height: 13px;
                }
            }
        }
    }
    .info-title {
        height: 40px;
        line-height: 40px;
        margin-bottom: 8px;
        color: #fff;
        font-size: 14px;
        background: linear-gradient(180deg, rgba(34, 81, 136, 0.28) 0%, rgba(37, 71, 116, 0) 51%, rgba(34, 81, 136, 0.28) 100%);
        .el-col:nth-child(1) {
            padding-left: 25px;
        }
        .el-col:not(:nth-child(1)) {
            text-align: center;
        }
    }
    .info-row {
        line-height: 40px;
        margin-top: 4px;
        .el-col:nth-child(1) {
            padding-left: 25px;
            font-size: 12px;
            span {
                display: inline-block;
                width: 8.7em;
                height: 28px;
                line-height: 28px;
                padding-left: 14px;
                background: rgba(14, 41, 87, 0.45);
                border: 1px solid #4698df;
                color: #fff;
                cursor: pointer;
                vertical-align: middle;
                &.is-hide {
                    border: 1px solid #203b56;
                    background: rgba(1, 25, 51, 0.15);
                }
            }
            .iconfont {
                display: inline-block;
                font-size: 16px;
                vertical-align: middle;
                margin-right: 6px;
                margin-top: -2px;
            }
        }
        .el-col:not(:nth-child(1)) {
            font-size: 14px;
            color: #ffffff;
            text-align: center;
        }
    }
    .info-row:nth-child(2n + 1) {
        background: linear-gradient(90deg, rgba(109, 153, 230, 0.07) 0%, rgba(51, 70, 104, 0.07) 100%);
    }
}
</style>
