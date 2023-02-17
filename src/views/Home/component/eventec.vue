<!--
 * @Description: 事件图表
 * @Date: 2022-11-21 15:04:23
-->
<template>
    <div class="event-ec-box">
        <div class="ec-title"><i class="el-icon-caret-right"></i>河道涉水事件</div>
        <div class="ec-tab">
            <el-radio-group v-model="tabVal1" size="mini">
                <el-radio-button label="柱状"></el-radio-button>
                <el-radio-button label="饼状"></el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="tabVal2" size="mini" @input="switchDate">
                <el-radio-button label="年"></el-radio-button>
                <el-radio-button label="季"></el-radio-button>
                <el-radio-button label="日"></el-radio-button>
            </el-radio-group>
            <el-button type="text" class="ec-tab-btn" @click="downloadEc">
                <i class="iconfont iconxiazai"></i>
            </el-button>
        </div>
        <div class="ec-box">
            <EcLine2 :ecLine="ec1Line" v-if="tabVal1 == '柱状'" ref="ecRefs" />
            <EcLine9 :ecLine="ec2Line" v-if="tabVal1 == '饼状'" ref="ecRefs" />
        </div>
    </div>
</template>

<script>
import EcLine2 from "@/components/Ec/EcLine22.vue";
import EcLine9 from "@/components/Ec/EcLine9.vue";
export default {
    components: { EcLine9, EcLine2 },
    data() {
        return {
            tabVal1: "柱状",
            tabVal2: "年",
            ec1Line: {
                id: 1,
                legend: false,
                dataZoom: false,
                zoomSt: 0,
                zoomEt: 100,
                labelColor: "rgba(219, 219, 219, 0.6)",
                yUnit: "数量",
                xData: ["1月", "2月", "3月", "4月", "5月", "6月"],
                sName: "数量",
                sData: [37, 18, 29, 19, 46, 13, 37, 18, 29, 19, 46, 13, 37, 18, 29, 19, 46, 13, 37, 18, 29, 19, 46, 13, 37, 18, 29, 19, 46, 13, 37, 18, 29, 19, 46, 13],
                colorList: ["#24AFF7", "rgba(1,36,59,0.98)"],
                barWidth: "22%"
            },
            ec2Line: {
                id: 2,
                vUnit: "",
                radiusList: ["0%", "50%"],
                center: ["50%", "50%"],
                sData: [37, 18, 29, 19, 46, 13, 37, 18, 29, 19, 46, 13, 37, 18, 29, 19, 46, 13, 37, 18, 29, 19, 46, 13, 37, 18, 29, 19, 46, 13, 37, 18, 29, 19, 46, 13],
                legend: {
                    show: false
                },
                xData: ["1月", "2月", "3月", "4月", "5月", "6月"],
                colorStr: false,
                label: true
            }
        };
    },
    created() {
        this.loadData();
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        switchDate(val) {
            this.loadData();
        },
        loadData() {
            let date = new Date();
            let tabVal2 = this.tabVal2;
            if (tabVal2 === "年") {
                this.ec1Line.dataZoom = false;
                this.ec1Line.xData = ["2020年", "2021年", "2022年"];
                this.ec2Line.xData = ["2020年", "2021年", "2022年"];
            } else if (tabVal2 === "季") {
                this.ec1Line.dataZoom = false;
                let month = date.getMonth() + 1;
                let m1 = new Date();
                m1.setMonth(m1.getMonth() - 1);
                let month1 = m1.getMonth() + 1;
                let m2 = new Date();
                m2.setMonth(m2.getMonth() - 2);
                let month2 = m2.getMonth() + 1;

                this.ec1Line.xData = [month2 + "月", month1 + "月", month + "月"];
                this.ec2Line.xData = [month2 + "月", month1 + "月", month + "月"];
            } else if (tabVal2 === "日") {
                this.ec1Line.dataZoom = true;
                let num = this.mGetDate();
                let st = 0;
                let et = 20;
                let thisDay = date.getDate();
                if (thisDay < 6) {
                } else if (thisDay < 12) {
                    st = 20;
                    et = 40;
                } else if (thisDay < 18) {
                    st = 40;
                    et = 60;
                } else if (thisDay < 24) {
                    st = 60;
                    et = 80;
                } else {
                    st = 80;
                    et = 100;
                }
                this.ec1Line.zoomSt = st;
                this.ec1Line.zoomEt = et;
                let dayNum = [];
                for (let i = 1; i <= num; i++) {
                    dayNum.push(i + "日");
                }
                this.ec1Line.xData = dayNum;
                this.ec2Line.xData = dayNum;
            }
        },
        mGetDate() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var d = new Date(year, month, 0);
            return d.getDate();
        },
        downloadEc() {
            this.$refs.ecRefs.downloadEc();
        }
    }
};
</script>

<style lang="scss" scoped>
.event-ec-box {
    .ec-tab {
        padding: 10px 8px;
        .ec-tab-btn {
            float: right;
            padding: 0;
            width: 26px;
            height: 26px;
            line-height: 26px;
            i {
                color: var(--el-color-primary);
            }
        }
    }
    .ec-box {
        height: 300px;
        padding: 0 0 5px 15px;
    }
}
</style>
