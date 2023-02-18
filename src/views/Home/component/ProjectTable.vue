<!--
 * @Description: 产线项目表格
 * @Author: jinxiaoshan
 * @Date: 2023-02-18 07:11:54
 * @LastEditors: jinxiaoshan
 * @LastEditTime: 2023-02-18 14:34:22
-->
<template>
    <div class="flex-column home-table">
        <div class="home-table-title">
            <span class="state-1">已完检验</span>
            <span class="state-2">待检验</span>
            <span class="state-3">超过4h未检验</span>
            <span class="state-4">未提交</span>
        </div>
        <div class="flex-1">
            <base-table
                ref="tableProj"
                :isLoading="listLoading"
                :table-columns="tableColumns"
                :list="tableData"
                :page-size="searchForm.size"
                :current-page="searchForm.current"
                :total="totalNum"
                :selection="false"
                :border="true"
                :number="false"
                :numberW="'50px'"
                :isPage="true"
                :heightType="'calc'"
                :rowKey="'id'"
                @changeCurrentData="changeCurrentData"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseTable from "@/components/BaseTable";
export default {
    components: { BaseTable },
    data() {
        return {
            listLoading: false,
            tableColumns: [],
            tableData: [],
            totalNum: 0, // 总条数
            searchForm: {
                current: 1, // 当前页
                size: 20 // 每页条数
            }
        };
    },
    computed: {
        productLinesId() {
            return this.$store.state.home.productLinesId;
        }
    },
    watch: {
        productLinesId: {
            deep: true,
            handler(newV, oldV) {
                if (newV) {
                    this.loadData();
                }
            }
        }
    },
    async created() {
        await this.initColumns();
        // if (this.isChange) {
        //     this.loadData();
        // }
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        initColumns() {
            const modify1 = () => {
                let arr = [];
                arr.push({
                    icon: false,
                    type: "text",
                    typeof: "link",
                    typecolor: "white",
                    method: this.changeFun
                });
                return arr;
            };

            this.tableColumns = [
                {
                    prop: "",
                    label: "编号",
                    align: "center",
                    width: "50px",
                    formart: "numStateColor",
                    formartVal: "YS"
                },
                {
                    prop: "PROJECT_NAME",
                    label: "项目",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "PRODUCTION_LINE_NAME",
                    label: "产线",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "OUTPUT_MATERIEL_NAME",
                    label: "产出物",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "OUTPUT__PRODUCTION_NUM",
                    label: "产出物数量",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "STATION_NO",
                    label: "工位编号",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "STATION_NAME",
                    label: "工位名称",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "MES_ORDER_NO",
                    label: "工单号",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "PROCESS_NAME",
                    label: "工单状态",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "NEW_REQUEST_TIME",
                    label: "提交时间",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "RESPONSE_TIME",
                    label: "响应时间",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "XYSC",
                    label: "响应时长min",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "INSPEC_TIME",
                    label: "实际完成检验时间",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "INSPEC_HOURS",
                    label: "检验时长min",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "THEORY_INSPEC_TIME",
                    label: "理论检验时长min",
                    align: "center",
                    formart: "stateColor",
                    formartVal: "YS"
                },
                {
                    prop: "INSPEC_PERSON_NAME",
                    label: "检验员",
                    align: "center",
                    modify: modify1
                }
            ];
        },
        /* 加载数据 */
        loadData() {
            this.listLoading = true;
            let res = {
                success: true,
                message: "成功",
                code: 200,
                result: {
                    records: [
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮加工检测-半成品",
                            INSPEC_HOURS: 39,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9850",
                            INSPEC_TIME: "2023-02-17 15:49:32",
                            STATION_NO: "B0702ZE24",
                            PROJECT_CODE: "CG-D039",
                            THEORY_INSPEC_TIME: "60",
                            PROJECT_NAME: "青岛地铁6号线(M118)",
                            STATION_NAME: "二维码贴码工位",
                            ART_SERIAL_NO: "BG20230000000000020680",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "二维码粘贴",
                            OUTPUT__PRODUCTION_NUM: "4",
                            MES_ORDER_NO: "1365996",
                            PRODUCTION_NO: "D1207267110679",
                            NEW_REQUEST_TIME: "2023-02-17 15:10:24",
                            XYSC: 1.0,
                            RESPONSE_TIME: "2023-02-17 15:11:24",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮加工M1",
                            INSPEC_HOURS: 54,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9860",
                            INSPEC_TIME: "2023-02-17 10:59:35",
                            STATION_NO: "B0702ZE24",
                            PROJECT_CODE: "GT-A024",
                            THEORY_INSPEC_TIME: "60",
                            PROJECT_NAME: "供AST公司350复兴号智能动车组（E69）转向架",
                            STATION_NAME: "二维码贴码工位",
                            ART_SERIAL_NO: "BG20220000000000385995",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "二维码粘贴",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1351412",
                            PRODUCTION_NO: "BVV000785290007",
                            NEW_REQUEST_TIME: "2023-02-17 10:05:13",
                            XYSC: 15.0,
                            RESPONSE_TIME: "2023-02-17 10:19:54",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "轮盘组成M1",
                            INSPEC_HOURS: 306,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9990",
                            INSPEC_TIME: "2023-02-17 15:45:31",
                            STATION_NO: "B0702ZM41",
                            PROJECT_CODE: "GT-C084",
                            THEORY_INSPEC_TIME: "120",
                            PROJECT_NAME: "CR400AF智能动车组（8编组）（E69）",
                            STATION_NAME: "制动盘整备工位",
                            ART_SERIAL_NO: "BG20220000000000452744",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "制动盘整备",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1373396",
                            PRODUCTION_NO: "BVV000811310035",
                            NEW_REQUEST_TIME: "2023-02-17 10:39:23",
                            XYSC: 194.0,
                            RESPONSE_TIME: "2023-02-17 13:53:16",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮加工M1",
                            INSPEC_HOURS: 54,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9860",
                            INSPEC_TIME: "2023-02-17 10:58:35",
                            STATION_NO: "B0702ZE24",
                            PROJECT_CODE: "GT-A024",
                            THEORY_INSPEC_TIME: "60",
                            PROJECT_NAME: "供AST公司350复兴号智能动车组（E69）转向架",
                            STATION_NAME: "二维码贴码工位",
                            ART_SERIAL_NO: "BG20220000000000383749",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "二维码粘贴",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1353152",
                            PRODUCTION_NO: "BVV000788470030",
                            NEW_REQUEST_TIME: "2023-02-17 10:04:21",
                            XYSC: 16.0,
                            RESPONSE_TIME: "2023-02-17 10:19:55",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "轮盘组成M1",
                            INSPEC_HOURS: 306,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9990",
                            INSPEC_TIME: "2023-02-17 15:44:36",
                            STATION_NO: "B0702ZM41",
                            PROJECT_CODE: "GT-C084",
                            THEORY_INSPEC_TIME: "120",
                            PROJECT_NAME: "CR400AF智能动车组（8编组）（E69）",
                            STATION_NAME: "制动盘整备工位",
                            ART_SERIAL_NO: "BG20220000000000452730",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "制动盘整备",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1372745",
                            PRODUCTION_NO: "BVV000811310028",
                            NEW_REQUEST_TIME: "2023-02-17 10:38:39",
                            XYSC: 195.0,
                            RESPONSE_TIME: "2023-02-17 13:53:13",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-40",
                            OUTPUT_MATERIEL_NAME: "轮对组成M1",
                            INSPEC_HOURS: 146,
                            PRODUCTION_LINE_NAME: "轴箱线",
                            PROCESS_NO: "9930",
                            INSPEC_TIME: "2023-02-17 11:04:45",
                            STATION_NO: "B0701ZE37",
                            PROJECT_CODE: "GT-C084",
                            THEORY_INSPEC_TIME: "160",
                            PROJECT_NAME: "CR400AF智能动车组（8编组）（E69）",
                            STATION_NAME: "人工作业工位",
                            ART_SERIAL_NO: "BG20230000000000006630",
                            INSPEC_PERSON_NO: "010500019773",
                            PROCESS_NAME: "完工整备",
                            OUTPUT__PRODUCTION_NUM: "1",
                            MES_ORDER_NO: "1373255",
                            PRODUCTION_NO: "103GBD103781",
                            NEW_REQUEST_TIME: "2023-02-17 08:38:51",
                            XYSC: 4.0,
                            RESPONSE_TIME: "2023-02-17 08:42:44",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "林文军"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮涂装",
                            INSPEC_HOURS: 47,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9980",
                            INSPEC_TIME: "2023-02-17 15:07:29",
                            STATION_NO: "B0702ZE56",
                            PROJECT_CODE: "CG-D063",
                            THEORY_INSPEC_TIME: "40",
                            PROJECT_NAME: "天津地铁7号线一期项目",
                            STATION_NAME: "完工整备",
                            ART_SERIAL_NO: "BG20220000000000440916",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "完工整备",
                            OUTPUT__PRODUCTION_NUM: "4",
                            MES_ORDER_NO: "1365495",
                            PRODUCTION_NO: "D1206977100138",
                            NEW_REQUEST_TIME: "2023-02-17 14:20:09",
                            XYSC: 7.0,
                            RESPONSE_TIME: "2023-02-17 14:27:12",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮涂装",
                            INSPEC_HOURS: 47,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9980",
                            INSPEC_TIME: "2023-02-17 15:07:29",
                            STATION_NO: "B0702ZE56",
                            PROJECT_CODE: "CG-D063",
                            THEORY_INSPEC_TIME: "40",
                            PROJECT_NAME: "天津地铁7号线一期项目",
                            STATION_NAME: "完工整备",
                            ART_SERIAL_NO: "BG20220000000000440917",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "完工整备",
                            OUTPUT__PRODUCTION_NUM: "4",
                            MES_ORDER_NO: "1365495",
                            PRODUCTION_NO: "D1206977100153",
                            NEW_REQUEST_TIME: "2023-02-17 14:20:09",
                            XYSC: 7.0,
                            RESPONSE_TIME: "2023-02-17 14:27:12",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-40",
                            OUTPUT_MATERIEL_NAME: "轮对组成M1",
                            INSPEC_HOURS: 146,
                            PRODUCTION_LINE_NAME: "轴箱线",
                            PROCESS_NO: "9930",
                            INSPEC_TIME: "2023-02-17 11:04:00",
                            STATION_NO: "B0701ZE37",
                            PROJECT_CODE: "GT-C084",
                            THEORY_INSPEC_TIME: "160",
                            PROJECT_NAME: "CR400AF智能动车组（8编组）（E69）",
                            STATION_NAME: "人工作业工位",
                            ART_SERIAL_NO: "BG20230000000000006753",
                            INSPEC_PERSON_NO: "010500019773",
                            PROCESS_NAME: "完工整备",
                            OUTPUT__PRODUCTION_NUM: "1",
                            MES_ORDER_NO: "1373765",
                            PRODUCTION_NO: "103GBD103780",
                            NEW_REQUEST_TIME: "2023-02-17 08:38:28",
                            XYSC: 4.0,
                            RESPONSE_TIME: "2023-02-17 08:42:44",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "林文军"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮加工检测-半成品",
                            INSPEC_HOURS: 36,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9730",
                            INSPEC_TIME: "2023-02-17 15:44:44",
                            STATION_NO: "B0702ZE24",
                            PROJECT_CODE: "CG-D072",
                            THEORY_INSPEC_TIME: "60",
                            PROJECT_NAME: "天津静海市域车项目",
                            STATION_NAME: "二维码贴码工位",
                            ART_SERIAL_NO: "BG20230000000000019019",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "二维码粘贴",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1366255",
                            PRODUCTION_NO: "D1201519101190",
                            NEW_REQUEST_TIME: "2023-02-17 15:08:37",
                            XYSC: 3.0,
                            RESPONSE_TIME: "2023-02-17 15:11:22",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-30",
                            OUTPUT_MATERIEL_NAME: "轮对组成M1",
                            INSPEC_HOURS: 146,
                            PRODUCTION_LINE_NAME: "轮对线",
                            PROCESS_NO: "9930",
                            INSPEC_TIME: "2023-02-17 11:04:45",
                            STATION_NO: "B0701ZE37",
                            PROJECT_CODE: "GT-C084",
                            THEORY_INSPEC_TIME: "160",
                            PROJECT_NAME: "CR400AF智能动车组（8编组）（E69）",
                            STATION_NAME: "人工作业工位",
                            ART_SERIAL_NO: "BG20230000000000006630",
                            INSPEC_PERSON_NO: "010500019773",
                            PROCESS_NAME: "完工整备",
                            OUTPUT__PRODUCTION_NUM: "1",
                            MES_ORDER_NO: "1373255",
                            PRODUCTION_NO: "103GBD103781",
                            NEW_REQUEST_TIME: "2023-02-17 08:38:51",
                            XYSC: 4.0,
                            RESPONSE_TIME: "2023-02-17 08:42:44",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "林文军"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮加工检测-半成品",
                            INSPEC_HOURS: 37,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9730",
                            INSPEC_TIME: "2023-02-17 15:46:23",
                            STATION_NO: "B0702ZE24",
                            PROJECT_CODE: "CG-D072",
                            THEORY_INSPEC_TIME: "60",
                            PROJECT_NAME: "天津静海市域车项目",
                            STATION_NAME: "二维码贴码工位",
                            ART_SERIAL_NO: "BG20230000000000019027",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "二维码粘贴",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1366349",
                            PRODUCTION_NO: "D1201241101178",
                            NEW_REQUEST_TIME: "2023-02-17 15:09:52",
                            XYSC: 2.0,
                            RESPONSE_TIME: "2023-02-17 15:11:23",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮加工M1",
                            INSPEC_HOURS: 54,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9860",
                            INSPEC_TIME: "2023-02-17 10:59:18",
                            STATION_NO: "B0702ZE24",
                            PROJECT_CODE: "GT-A024",
                            THEORY_INSPEC_TIME: "60",
                            PROJECT_NAME: "供AST公司350复兴号智能动车组（E69）转向架",
                            STATION_NAME: "二维码贴码工位",
                            ART_SERIAL_NO: "BG20220000000000383880",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "二维码粘贴",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1354764",
                            PRODUCTION_NO: "BVV000788470076",
                            NEW_REQUEST_TIME: "2023-02-17 10:04:49",
                            XYSC: 15.0,
                            RESPONSE_TIME: "2023-02-17 10:19:54",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮涂装",
                            INSPEC_HOURS: 47,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9980",
                            INSPEC_TIME: "2023-02-17 15:07:29",
                            STATION_NO: "B0702ZE56",
                            PROJECT_CODE: "CG-D063",
                            THEORY_INSPEC_TIME: "40",
                            PROJECT_NAME: "天津地铁7号线一期项目",
                            STATION_NAME: "完工整备",
                            ART_SERIAL_NO: "BG20220000000000440915",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "完工整备",
                            OUTPUT__PRODUCTION_NUM: "4",
                            MES_ORDER_NO: "1365495",
                            PRODUCTION_NO: "D1206977100128",
                            NEW_REQUEST_TIME: "2023-02-17 14:20:09",
                            XYSC: 7.0,
                            RESPONSE_TIME: "2023-02-17 14:27:12",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮加工M1",
                            INSPEC_HOURS: 56,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9860",
                            INSPEC_TIME: "2023-02-17 10:59:49",
                            STATION_NO: "B0702ZE24",
                            PROJECT_CODE: "GT-A024",
                            THEORY_INSPEC_TIME: "60",
                            PROJECT_NAME: "供AST公司350复兴号智能动车组（E69）转向架",
                            STATION_NAME: "二维码贴码工位",
                            ART_SERIAL_NO: "BG20220000000000383860",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "二维码粘贴",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1354688",
                            PRODUCTION_NO: "BVV000785290064",
                            NEW_REQUEST_TIME: "2023-02-17 10:03:56",
                            XYSC: 16.0,
                            RESPONSE_TIME: "2023-02-17 10:19:54",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮涂装",
                            INSPEC_HOURS: 47,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9980",
                            INSPEC_TIME: "2023-02-17 15:06:45",
                            STATION_NO: "B0702ZE56",
                            PROJECT_CODE: "CG-D063",
                            THEORY_INSPEC_TIME: "40",
                            PROJECT_NAME: "天津地铁7号线一期项目",
                            STATION_NAME: "完工整备",
                            ART_SERIAL_NO: "BG20220000000000442295",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "完工整备",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1366380",
                            PRODUCTION_NO: "D1206977100156",
                            NEW_REQUEST_TIME: "2023-02-17 14:19:41",
                            XYSC: 8.0,
                            RESPONSE_TIME: "2023-02-17 14:27:11",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮加工检测-半成品",
                            INSPEC_HOURS: 39,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9850",
                            INSPEC_TIME: "2023-02-17 15:49:32",
                            STATION_NO: "B0702ZE24",
                            PROJECT_CODE: "CG-D039",
                            THEORY_INSPEC_TIME: "60",
                            PROJECT_NAME: "青岛地铁6号线(M118)",
                            STATION_NAME: "二维码贴码工位",
                            ART_SERIAL_NO: "BG20230000000000020678",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "二维码粘贴",
                            OUTPUT__PRODUCTION_NUM: "4",
                            MES_ORDER_NO: "1365996",
                            PRODUCTION_NO: "D1207267110651",
                            NEW_REQUEST_TIME: "2023-02-17 15:10:24",
                            XYSC: 1.0,
                            RESPONSE_TIME: "2023-02-17 15:11:21",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "轮盘组成M1",
                            INSPEC_HOURS: 306,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9990",
                            INSPEC_TIME: "2023-02-17 15:45:31",
                            STATION_NO: "B0702ZM41",
                            PROJECT_CODE: "GT-C084",
                            THEORY_INSPEC_TIME: "120",
                            PROJECT_NAME: "CR400AF智能动车组（8编组）（E69）",
                            STATION_NAME: "制动盘整备工位",
                            ART_SERIAL_NO: "BG20220000000000452743",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "制动盘整备",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1373396",
                            PRODUCTION_NO: "BVV000811310033",
                            NEW_REQUEST_TIME: "2023-02-17 10:39:23",
                            XYSC: 194.0,
                            RESPONSE_TIME: "2023-02-17 13:53:16",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮加工M1",
                            INSPEC_HOURS: 54,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9860",
                            INSPEC_TIME: "2023-02-17 10:58:35",
                            STATION_NO: "B0702ZE24",
                            PROJECT_CODE: "GT-A024",
                            THEORY_INSPEC_TIME: "60",
                            PROJECT_NAME: "供AST公司350复兴号智能动车组（E69）转向架",
                            STATION_NAME: "二维码贴码工位",
                            ART_SERIAL_NO: "BG20220000000000383750",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "二维码粘贴",
                            OUTPUT__PRODUCTION_NUM: "2",
                            MES_ORDER_NO: "1353152",
                            PRODUCTION_NO: "BVV000788470018",
                            NEW_REQUEST_TIME: "2023-02-17 10:04:21",
                            XYSC: 16.0,
                            RESPONSE_TIME: "2023-02-17 10:19:53",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PRODUCT_LINE_NO: "3-40-10",
                            OUTPUT_MATERIEL_NAME: "车轮涂装",
                            INSPEC_HOURS: 47,
                            PRODUCTION_LINE_NAME: "车轮线",
                            PROCESS_NO: "9980",
                            INSPEC_TIME: "2023-02-17 15:07:16",
                            STATION_NO: "B0702ZE56",
                            PROJECT_CODE: "CG-D063",
                            THEORY_INSPEC_TIME: "40",
                            PROJECT_NAME: "天津地铁7号线一期项目",
                            STATION_NAME: "完工整备",
                            ART_SERIAL_NO: "BG20220000000000440963",
                            INSPEC_PERSON_NO: "010500012482",
                            PROCESS_NAME: "完工整备",
                            OUTPUT__PRODUCTION_NUM: "4",
                            MES_ORDER_NO: "1365412",
                            PRODUCTION_NO: "D1206977100089",
                            NEW_REQUEST_TIME: "2023-02-17 14:19:55",
                            XYSC: 7.0,
                            RESPONSE_TIME: "2023-02-17 14:27:14",
                            WBS_CODE: null,
                            YS: "1",
                            INSPEC_PERSON_NAME: "吕建海"
                        }
                    ],
                    total: 121,
                    size: 20,
                    current: 1,
                    orders: [],
                    searchCount: true,
                    pages: 7
                },
                timestamp: 1676624793736
            };
            setTimeout(() => {
                this.listLoading = false;
                if (res.success && res.result) {
                    let resData = res.result.records;
                    resData = resData.filter((item) => item.STATION_NO == this.productLinesId);
                    this.tableData = resData;
                    this.totalNum = res.result.total;
                    // 重置滚动条位置
                } else {
                    this.tableData = [];
                    this.totalNum = 0;
                }
                this.$refs.tableProj.toScrollTop();
            }, 200);
        },
        /* 分页发生变化 */
        changeCurrentData(pages) {
            if (pages.pageSize) {
                this.searchForm.size = pages.pageSize;
            }
            if (pages.currentPage) {
                this.searchForm.current = pages.currentPage;
            }
            this.loadData();
        },
        /* 切换产线 */
        changeFun(index, row) {}
    }
};
</script>

<style lang="scss" scoped>
.home-table-title {
    span {
        margin-right: 10px;
        font-size: 12px;
        color: #bdbdd1;
        &:before {
            content: "";
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 4px;
        }
        &.state-1:before {
            background-color: var(--status-color-green);
        }
        &.state-2:before {
            background-color: var(--status-color-blue);
        }
        &.state-3:before {
            background-color: var(--status-color-yellow);
        }
        &.state-4:before {
            background-color: var(--status-color-gray);
        }
    }
}
</style>
