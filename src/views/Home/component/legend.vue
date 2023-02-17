<!--
 * @Description: 图例
 * @Date: 2022-11-21 15:04:23
-->
<template>
    <div class="legend-box">
        <template v-for="(item, idx) in legendData">
            <div class="legend-row" :key="idx"><img :src="item.icon" class="legend-icon" />{{ item.label }}</div>
        </template>
    </div>
</template>

<script>
import RiverIcon from "@/assets/imgs/icon/River.png";
import AlertIcon from "@/assets/imgs/icon/Alert.png";
import CCTVIcon from "@/assets/imgs/icon/CCTV.png";
import DroneIcon from "@/assets/imgs/icon/Drone.png";
import HydroIcon from "@/assets/imgs/icon/HydroStation.png";
import WaterIcon from "@/assets/imgs/icon/WaterStation.png";
import RainIcon from "@/assets/imgs/icon/RainStation.png";
import GateIcon from "@/assets/imgs/icon/Gate.png";
import PondingIcon from "@/assets/imgs/icon/Ponding.png";

export default {
    props: {
        specialType: {
            type: String,
            default: "1"
        }
    },
    data() {
        return {
            legendData: []
        };
    },
    created() {
        if (this.specialType === "1") {
            // 首页
            this.legendData = [
                { icon: AlertIcon, label: "告警", color: "#D14E4E" },
                { icon: CCTVIcon, label: "监控", color: "#02D2F4" },
                { icon: DroneIcon, label: "无人机", color: "#FF9841" },
                { icon: HydroIcon, label: "水文站", color: "#FF78D2" },
                { icon: WaterIcon, label: "水质站", color: "#CFC26B" },
                { icon: RainIcon, label: "雨量站", color: "#75FFA5" },
                { icon: GateIcon, label: "闸泵", color: "#75FFA5" }
            ];
        } else if (this.specialType === "2") {
            // 防汛专题
            this.legendData = [
                { icon: PondingIcon, label: "积水点", color: "#BD65FF" },
                { icon: AlertIcon, label: "告警", color: "#D14E4E" },
                { icon: GateIcon, label: "闸泵", color: "#75FFA5" }
            ];
        } else if (this.specialType === "3") {
            // 水雨情专题
            this.legendData = [
                { icon: AlertIcon, label: "告警", color: "#D14E4E" },
                { icon: HydroIcon, label: "水文站", color: "#FF78D2" },
                { icon: WaterIcon, label: "水质站", color: "#CFC26B" },
                { icon: RainIcon, label: "雨量站", color: "#75FFA5" }
            ];
        } else if (this.specialType === "4") {
            // 告警专题
            this.legendData = [{ icon: AlertIcon, label: "告警", color: "#D14E4E" }];
        } else if (this.specialType === "5") {
            // 无人机专题
            this.legendData = [
                { icon: CCTVIcon, label: "监控", color: "#02D2F4" },
                { icon: DroneIcon, label: "无人机", color: "#FF9841" }
            ];
        }
    },
    mounted() {},
    beforeDestroy() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.legend-box {
    position: absolute;
    right: 12px;
    bottom: 12px;
    padding: 10px 0;
    z-index: 100;
    box-shadow: 0px 2px 4px rgba(32, 46, 75, 0.2);
    background-color: #00175a;
    border-radius: 2px;
    &.legendR {
        right: 390px !important;
    }

    .legend-row {
        height: 36px;
        line-height: 36px;
        padding: 0 28px 0 16px;
        color: #fcfcfc;
        font-size: 12px;
        .legend-icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            margin-top: -2px;
            vertical-align: middle;
        }
    }
}
</style>
