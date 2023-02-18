<!--
 * @Description: 每日最短响应时长/min
 * @Author: jinxiaoshan
 * @Date: 2023-02-18 07:11:54
 * @LastEditors: jinxiaoshan
 * @LastEditTime: 2023-02-18 12:56:57
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
                legend: false,
                yName: "",
                yUnit: "",
                xData: ["", "", ""],
                sData: [
                    {
                        name: "最短响应时长",
                        color: ["#58C0E0", "#2E6986"],
                        data: []
                    }
                ],
                labelColor: "#bdbdd1",
                barWidth: "10%",
                barGap: 0,
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
                    { INSPEC_PERSON_NO: "010500012482", PRODUCT_LINE_NO: "3-40-10", DAY_DT: "20230213", XYSC: 2.0, INSPEC_PERSON_NAME: "吕建海" },
                    { INSPEC_PERSON_NO: "010500012484", PRODUCT_LINE_NO: "3-40-10", DAY_DT: "20230214", XYSC: 4.0, INSPEC_PERSON_NAME: "胡勇智" },
                    { INSPEC_PERSON_NO: "010500012482", PRODUCT_LINE_NO: "3-40-10", DAY_DT: "20230215", XYSC: 1.0, INSPEC_PERSON_NAME: "吕建海" },
                    { INSPEC_PERSON_NO: "010500012484", PRODUCT_LINE_NO: "3-40-10", DAY_DT: "20230216", XYSC: 2.0, INSPEC_PERSON_NAME: "胡勇智" },
                    { INSPEC_PERSON_NO: "010500012482", PRODUCT_LINE_NO: "3-40-10", DAY_DT: "20230217", XYSC: 1.0, INSPEC_PERSON_NAME: "吕建海" }
                ],
                timestamp: 1676624794615
            };

            if (res?.success && res?.result) {
                let xData = [],
                    bar1 = [];
                res.result.forEach((item) => {
                    let date = "";
                    if (item.DAY_DT) {
                        date = item.DAY_DT.slice(4, 6) + "-" + item.DAY_DT.slice(6);
                    }
                    xData.push(date);
                    bar1.push(item.XYSC);
                });
                if (res.result.length > 4) {
                    this.ecLine.dataZoom = true;
                    let zoomEt = Math.round((4 / res.result.length) * 10000) / 100;
                    this.ecLine.zoomEt = zoomEt;
                }

                this.ecLine.xData = xData;
                this.ecLine.sData[0].data = bar1;
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
