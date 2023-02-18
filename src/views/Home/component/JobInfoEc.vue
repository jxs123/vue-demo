<!--
 * @Description: 作业信息图表
 * @Author: jinxiaoshan
 * @Date: 2023-02-18 07:11:54
 * @LastEditors: jinxiaoshan
 * @LastEditTime: 2023-02-18 12:04:48
-->
<template>
    <div class="flex-column home-ec">
        <ec-title :title="'吕建海检验作业信息统计'"></ec-title>
        <div class="flex-1">
            <EcLine1 :ecLine="ecLine"></EcLine1>
        </div>
    </div>
</template>

<script>
import EcLine1 from "@/components/Ec/EcLine1";
import EcTitle from "./EcTitle";
export default {
    components: { EcLine1, EcTitle },
    data() {
        return {
            ecLine: {
                legend: true,
                yName: "",
                yUnit: "",
                xData: ["", "", ""],
                sData: [
                    {
                        name: "响应时长/min",
                        color: "#865638",
                        data: []
                    },
                    {
                        name: "检验时长/min",
                        color: "#278AB2",
                        data: []
                    }
                ],
                boundaryGap: true,
                smooth: false,
                labelColor: "#bdbdd1"
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
                    { INSPEC_HOURS: 154, DAY_DT: "20230213", XYSC: 4.0 },
                    { INSPEC_HOURS: 97, DAY_DT: "20230215", XYSC: 14.0 },
                    { INSPEC_HOURS: 118, DAY_DT: "20230217", XYSC: 60.0 }
                ],
                timestamp: 1676624795248
            };

            if (res?.success && res?.result) {
                let xData = [],
                    line1 = [],
                    line2 = [];
                res.result.forEach((item) => {
                    let date = "";
                    if (item.DAY_DT) {
                        date = item.DAY_DT.slice(4, 6) + "-" + item.DAY_DT.slice(6);
                    }
                    xData.push(date);
                    line1.push(item.XYSC);
                    line2.push(item.INSPEC_HOURS);
                });
                this.ecLine.xData = xData;
                this.ecLine.sData[0].data = line1;
                this.ecLine.sData[1].data = line2;
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
