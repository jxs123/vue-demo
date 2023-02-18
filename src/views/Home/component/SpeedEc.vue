<!--
 * @Description: 轮轴工区交检进度表
 * @Author: jinxiaoshan
 * @Date: 2023-02-18 07:11:54
 * @LastEditors: jinxiaoshan
 * @LastEditTime: 2023-02-18 13:38:28
-->
<template>
    <div class="flex-column home-ec">
        <ec-title :title="'轮轴工区交检进度表'"></ec-title>
        <div class="flex-1">
            <EcLine3 :ecLine="ecLine"></EcLine3>
        </div>
    </div>
</template>

<script>
import EcLine3 from "@/components/Ec/EcLine3";
import EcTitle from "./EcTitle";
export default {
    components: { EcLine3, EcTitle },
    data() {
        return {
            ecLine: {
                legend: true,
                yName: "",
                yUnit: "",
                xData: ["", "", ""],
                sData: [
                    {
                        name: "计划数量",
                        color: ["#58C0E0", "#2E6986"],
                        stack: "",
                        data: []
                    },
                    {
                        name: "计划内完成数",
                        color: ["#3DA8F5", "#4B74D4"],
                        stack: "",
                        data: []
                    },
                    {
                        name: "待检验数量",
                        color: ["#4FD2C6", "#109889"],
                        stack: "",
                        data: []
                    },
                    {
                        name: "提交检验数量",
                        color: ["#FBC613", "#E58454"],
                        stack: "jysl",
                        data: []
                    },
                    {
                        name: "专检完成数量",
                        color: ["#BDF9FE", "#0CFBF7"],
                        stack: "zjwc",
                        data: []
                    },
                    {
                        name: "计划外完成数",
                        color: ["#59ADE8", "#2587C7"],
                        stack: "jhw",
                        data: []
                    },
                    {
                        name: "计划外提交交检数量",
                        color: ["#88D4AF", "#5CC67D"],
                        stack: "jysl",
                        data: []
                    },
                    {
                        name: "计划外专检完成数量",
                        color: ["#C198E4", "#EFCCFF"],
                        stack: "zjwc",
                        data: []
                    },
                    {
                        name: "计划外待检验数量",
                        color: ["#DFE66A", "#DFEC52"],
                        stack: "jhw",
                        data: []
                    }
                ],
                labelColor: "#bdbdd1",
                barWidth: "7%",
                barGap: 0.3,
                dataZoom: false,
                zoomSt: 0,
                zoomEt: 100,
                showLabel: false
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
                    {
                        MANAGE_AREA_NO: "ZQ03",
                        COMPLETE_INSPEC_NUM: 22,
                        NPCOMPLETE_INSPEC_NUM: 42,
                        PRODUCT_LINE_NO: "3-40-10",
                        PRODUCTION_LINE_NAME: "车轮线",
                        NPSUBMIT_INSPEC_NUM: 42,
                        NP_ACTUAL_NUM: 7,
                        SUBMIT_INSPEC_NUM: 22,
                        DJJ_NUM: 0,
                        ATTR2: 0,
                        ATTR1: 52,
                        JHWDJJ_NUM: 0
                    },
                    {
                        MANAGE_AREA_NO: "ZQ03",
                        COMPLETE_INSPEC_NUM: 10,
                        NPCOMPLETE_INSPEC_NUM: 4,
                        PRODUCT_LINE_NO: "3-40-30",
                        PRODUCTION_LINE_NAME: "轮对线",
                        NPSUBMIT_INSPEC_NUM: 4,
                        NP_ACTUAL_NUM: 0,
                        SUBMIT_INSPEC_NUM: 12,
                        DJJ_NUM: 2,
                        ATTR2: 0,
                        ATTR1: 25,
                        JHWDJJ_NUM: 0
                    },
                    {
                        MANAGE_AREA_NO: "ZQ03",
                        COMPLETE_INSPEC_NUM: 4,
                        NPCOMPLETE_INSPEC_NUM: 0,
                        PRODUCT_LINE_NO: "3-40-50",
                        PRODUCTION_LINE_NAME: "齿轮箱线",
                        NPSUBMIT_INSPEC_NUM: 0,
                        NP_ACTUAL_NUM: 0,
                        SUBMIT_INSPEC_NUM: 4,
                        DJJ_NUM: 0,
                        ATTR2: 0,
                        ATTR1: 12,
                        JHWDJJ_NUM: 0
                    }
                ],
                timestamp: 1676624793731
            };

            if (res?.success && res?.result) {
                let xData = [],
                    bar1 = [],
                    bar2 = [],
                    bar3 = [],
                    bar4 = [],
                    bar5 = [],
                    bar6 = [],
                    bar7 = [],
                    bar8 = [],
                    bar9 = [];
                res.result.forEach((item) => {
                    xData.push(item.PRODUCTION_LINE_NAME);
                    bar1.push(item.ATTR1);
                    bar2.push(item.NP_ACTUAL_NUM);
                    bar3.push(item.DJJ_NUM);
                    bar4.push(item.SUBMIT_INSPEC_NUM);
                    bar5.push(item.COMPLETE_INSPEC_NUM);
                    bar6.push(item.ATTR2);
                    bar7.push(item.NPCOMPLETE_INSPEC_NUM);
                    bar8.push(item.NPSUBMIT_INSPEC_NUM);
                    bar9.push(item.JHWDJJ_NUM);
                });
                this.ecLine.xData = xData;
                this.ecLine.sData[0].data = bar1;
                this.ecLine.sData[1].data = bar2;
                this.ecLine.sData[2].data = bar3;
                this.ecLine.sData[3].data = bar4;
                this.ecLine.sData[4].data = bar5;
                this.ecLine.sData[5].data = bar6;
                this.ecLine.sData[6].data = bar7;
                this.ecLine.sData[7].data = bar7;
                this.ecLine.sData[8].data = bar9;
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
