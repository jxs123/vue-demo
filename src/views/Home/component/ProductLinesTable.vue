<!--
 * @Description: 产线表格
 * @Author: jinxiaoshan
 * @Date: 2023-02-18 07:11:54
 * @LastEditors: jinxiaoshan
 * @LastEditTime: 2023-02-18 14:37:41
-->
<template>
    <div class="flex-column home-table">
        <div class="home-table-title"></div>
        <div class="flex-1">
            <base-table
                ref="tableRef"
                :isLoading="listLoading"
                :table-columns="tableColumns"
                :list="tableData"
                :page-size="searchForm.size"
                :current-page="searchForm.current"
                :total="totalNum"
                :selection="false"
                :border="true"
                :number="true"
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
import BaseTable from "@/components/BaseTable";
export default {
    components: {
        BaseTable
    },
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
    async created() {
        await this.initColumns();
        this.loadData();
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
                    prop: "PRODUCTION_LINE_NAME",
                    label: "产线",
                    align: "center",
                    modify: modify1
                },
                {
                    prop: "STATION_NO",
                    label: "工位编号",
                    align: "center"
                },
                {
                    prop: "STATION_NAME",
                    label: "工位名称",
                    align: "center",
                    width: "130px"
                },
                {
                    prop: "ATTR1",
                    label: "计划数量",
                    align: "center",
                    width: "90px"
                },
                {
                    prop: "ATTR2",
                    label: "完工数量计划内(计划外)]",
                    align: "center"
                },
                {
                    prop: "SUBMIT_INSPEC_NUM",
                    label: "提交检验数量计划内(计十划外]",
                    align: "center"
                },
                {
                    prop: "COMPLETE_INSPEC_NUM",
                    label: "交检完成数量计划内(计划外)]",
                    align: "center"
                },
                {
                    prop: "DJJ_NUM",
                    label: "待检验数量计十划内(计划外)]",
                    align: "center"
                },
                {
                    prop: "PERSON_NAME",
                    label: "检验员",
                    align: "center",
                    formart: "tooltip",
                    formartVal: "STATION_NO"
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
                            PERSON_NAME: "吕建海(吕建海)",
                            COMPLETE_INSPEC_NUM: "4(12)",
                            PRODUCT_LINE_NO: "3-40-10",
                            PRODUCTION_LINE_NAME: "车轮线",
                            SUBMIT_INSPEC_NUM: "4(12)",
                            DJJ_NUM: "0(0)",
                            STATION_NO: "B0702ZM41",
                            PERSON_NO: "010500012482(010500012482)",
                            ATTR2: "0(0)",
                            ATTR1: 20,
                            STATION_NAME: "制动盘整备工位"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PERSON_NAME: "吕建海(吕建海)",
                            COMPLETE_INSPEC_NUM: "4(20)",
                            PRODUCT_LINE_NO: "3-40-10",
                            PRODUCTION_LINE_NAME: "车轮线",
                            SUBMIT_INSPEC_NUM: "4(20)",
                            DJJ_NUM: "0(0)",
                            STATION_NO: "B0702ZE24",
                            PERSON_NO: "010500012482(010500012482)",
                            ATTR2: "0(7)",
                            ATTR1: 18,
                            STATION_NAME: "二维码贴码工位"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PERSON_NAME: "胡勇智、吕建海(吕建海)",
                            COMPLETE_INSPEC_NUM: "14(10)",
                            PRODUCT_LINE_NO: "3-40-10",
                            PRODUCTION_LINE_NAME: "车轮线",
                            SUBMIT_INSPEC_NUM: "14(10)",
                            DJJ_NUM: "0(0)",
                            STATION_NO: "B0702ZE56",
                            PERSON_NO: "010500012484、010500012482(010500012482)",
                            ATTR2: "0(0)",
                            ATTR1: 14,
                            STATION_NAME: "完工整备"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PERSON_NAME: "胡勇智、林文军(林文军)",
                            COMPLETE_INSPEC_NUM: "10(4)",
                            PRODUCT_LINE_NO: "3-40-30",
                            PRODUCTION_LINE_NAME: "轮对线",
                            SUBMIT_INSPEC_NUM: "12(4)",
                            DJJ_NUM: "2(0)",
                            STATION_NO: "B0701ZE37",
                            PERSON_NO: "010500012484、010500019773(010500019773)",
                            ATTR2: "0(0)",
                            ATTR1: 25,
                            STATION_NAME: "人工作业工位"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PERSON_NAME: null,
                            COMPLETE_INSPEC_NUM: "0(0)",
                            PRODUCT_LINE_NO: "3-40-50",
                            PRODUCTION_LINE_NAME: "齿轮箱线",
                            SUBMIT_INSPEC_NUM: "0(0)",
                            DJJ_NUM: "0(0)",
                            STATION_NO: "B0701ZM30",
                            PERSON_NO: null,
                            ATTR2: "0(0)",
                            ATTR1: 8,
                            STATION_NAME: "齿轮箱整备工位"
                        },
                        {
                            MANAGE_AREA_NO: "ZQ03",
                            PERSON_NAME: "林文军",
                            COMPLETE_INSPEC_NUM: "4(0)",
                            PRODUCT_LINE_NO: "3-40-50",
                            PRODUCTION_LINE_NAME: "齿轮箱线",
                            SUBMIT_INSPEC_NUM: "4(0)",
                            DJJ_NUM: "0(0)",
                            STATION_NO: "B0701ZE31",
                            PERSON_NO: "010500019773",
                            ATTR2: "0(0)",
                            ATTR1: 4,
                            STATION_NAME: "齿轮箱整备工位"
                        }
                    ],
                    total: 6,
                    size: 20,
                    current: 1,
                    orders: [],
                    searchCount: true,
                    pages: 1
                },
                timestamp: 1676624793731
            };
            setTimeout(() => {
                this.listLoading = false;
                if (res?.success) {
                    if (res?.result) {
                        if (res.result.records.length > 0) {
                            let id = res.result.records[0].STATION_NO;
                            this.$store.commit("home/SET_PRODUCT", id);
                        }
                        this.tableData = res.result.records;
                        this.totalNum = res.result.total;
                    }
                }
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
        changeFun(index, row) {
            let id = row.STATION_NO;
            this.$store.commit("home/SET_PRODUCT", id);
        }
    }
};
</script>

<style lang="scss" scoped></style>
