<!--
 * @Description: 轮轴工区交检时长统计
 * @Author: jinxiaoshan
 * @Date: 2023-02-18 07:11:54
 * @LastEditors: jinxiaoshan
 * @LastEditTime: 2023-02-18 12:57:47
-->
<template>
    <div class="flex-column home-ec">
        <ec-title :title="'轮轴工区交检时长统计'"></ec-title>
        <div class="flex-1">
            <EcLine2 :ecLine="ecLine"></EcLine2>
        </div>
    </div>
</template>

<script>
import EcLine2 from "@/components/Ec/EcLine2";
import EcTitle from "./EcTitle";
export default {
    components: { EcLine2, EcTitle },
    data() {
        return {
            ecLine: {
                legend: true,
                yName: "",
                yUnit: "",
                xData: ["", "", ""],
                sData: [
                    {
                        name: "理论交检时长",
                        color: ["#58C0E0", "#2E6986"],
                        data: []
                    },
                    {
                        name: "响应时长",
                        color: ["#3DA8F5", "#4B74D4"],
                        data: []
                    },
                    {
                        name: "检验时长",
                        color: ["#4FD2C6", "#109889"],
                        data: []
                    }
                ],
                labelColor: "#bdbdd1",
                barWidth: "10%",
                barGap: 0.3,
                dataZoom: false,
                zoomSt: 0,
                zoomEt: 100,
                showLabel: true
            }
        };
    },
    created() {
        this.loadData();
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        loadData() {
            let res = {
                success: true,
                message: "成功",
                code: 200,
                result: [
                    { MANAGE_AREA_NO: "ZQ03", PRODUCT_LINE_NO: "3-40-10", INSPEC_HOURS: 108, PRODUCTION_LINE_NAME: "车轮线", XYSC: 53.0, THEORY_INSPEC_TIME: 72 },
                    { MANAGE_AREA_NO: "ZQ03", PRODUCT_LINE_NO: "3-40-30", INSPEC_HOURS: 159, PRODUCTION_LINE_NAME: "轮对线", XYSC: 3.0, THEORY_INSPEC_TIME: 160 },
                    { MANAGE_AREA_NO: "ZQ03", PRODUCT_LINE_NO: "3-40-40", INSPEC_HOURS: 147, PRODUCTION_LINE_NAME: "轴箱线", XYSC: 3.0, THEORY_INSPEC_TIME: 160 },
                    { MANAGE_AREA_NO: "ZQ03", PRODUCT_LINE_NO: "3-40-50", INSPEC_HOURS: 33, PRODUCTION_LINE_NAME: "齿轮箱线", XYSC: 2.0, THEORY_INSPEC_TIME: 160 }
                ],
                timestamp: 1676624793734
            };

            if (res?.success && res?.result) {
                let xData = [],
                    bar1 = [],
                    bar2 = [],
                    bar3 = [];
                res.result.forEach((item) => {
                    xData.push(item.PRODUCTION_LINE_NAME);
                    bar1.push(item.THEORY_INSPEC_TIME);
                    bar2.push(item.XYSC);
                    bar3.push(item.INSPEC_HOURS);
                });
                this.ecLine.xData = xData;
                this.ecLine.sData[0].data = bar1;
                this.ecLine.sData[1].data = bar2;
                this.ecLine.sData[2].data = bar3;
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
