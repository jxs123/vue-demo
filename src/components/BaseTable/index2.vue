<!--
 * @Description: 表格
 * @Author: jinxiaoshan
 * @Date: 2021-07-22 19:38:34
-->
<template>
    <div class="base-table clearfix" ref="tableHeiRefs">
        <el-table
            ref="baseTableRefs"
            v-show="tableColumns.length > 0 || showTable"
            tooltip-effect="dark"
            border
            style="width: 100%"
            :data="list"
            @sort-change="sortChange"
            @selection-change="handleSelectionChange"
            :[heiKey]="tableHei == 'auto' ? '100%' : tableHei"
            :row-key="rowKey"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            @row-click="rowClick"
            :show-summary="sumRowState"
            :summary-method="getSummaries"
            v-loading="isLoading"
        >
            <!-- 复选框 -->
            <template v-if="selection">
                <el-table-column type="selection" width="70px" align="center" :reserve-selection="true" />
            </template>

            <!-- 序号 -->
            <template v-if="number">
                <el-table-column type="index" :index="indexMethod" label="序号" width="80px" align="center" />
            </template>

            <el-table-column
                v-for="(item, key) in tableColumns"
                :key="key"
                :label="item.label"
                :prop="item.prop"
                :width="item.width ? item.width + '' : ''"
                :align="item.align"
                :fixed="item.fixed"
                :sortable="item.sortable"
                :show-overflow-tooltip="item.showOverflowTooltip"
            >
                <template slot-scope="scope">
                    <!-- 操作按钮区 function -->
                    <template v-if="typeof item.modify === 'function'">
                        <span>
                            <template v-for="(v, index) in item.modify(scope.row, key)">
                                <template v-if="v.typeof === 'button'">
                                    <el-button
                                        size="mini"
                                        :key="index"
                                        :class="[{ 'm-l-xs': index != 0 }, v.typecolor ? 'btn-text-' + v.typecolor : 'btn-text-primary']"
                                        :type="v.type ? v.type : 'primary'"
                                        :disabled="scope.row | disabledState(v.disabled, v.disabledValue)"
                                        :title="v.iconName"
                                        @click.native.stop="
                                            () => {
                                                v.method(scope.$index, scope.row);
                                            }
                                        "
                                    >
                                        <i v-if="v.icon" :class="`iconfont ${v.iconclass}`"></i>{{ v.name }}
                                    </el-button>
                                </template>
                                <!-- 编辑字段 -->
                                <template v-else-if="v.typeof === 'edit'">
                                    <span :key="'editname' + index">
                                        {{ scope.row[item.prop] }}
                                        <i
                                            :class="`iconfont ${v.headerIcon} edit-icon`"
                                            @click.native.stop="
                                                () => {
                                                    v.method(item.prop, scope.row);
                                                }
                                            "
                                        ></i>
                                    </span>
                                </template>
                                <template v-else-if="v.typeof === 'editLink'">
                                    <span :key="'editname' + index">
                                        <el-button
                                            :class="{ 'm-l-xs': index != 0 }"
                                            type="text"
                                            size="mini"
                                            @click.native.stop="
                                                () => {
                                                    v.method1(scope.$index, scope.row);
                                                }
                                            "
                                            >{{ scope.row[item.prop] }}</el-button
                                        >
                                        <i
                                            :class="`iconfont ${v.headerIcon} edit-icon`"
                                            @click.native.stop="
                                                () => {
                                                    v.method2(item.prop, scope.row);
                                                }
                                            "
                                        ></i>
                                    </span>
                                </template>
                                <template v-else-if="v.typeof === 'link'">
                                    <span :key="'link' + index">
                                        <el-button
                                            :class="{ 'm-l-xs': index != 0 }"
                                            type="text"
                                            size="mini"
                                            @click.native.stop="
                                                () => {
                                                    v.method(scope.$index, scope.row);
                                                }
                                            "
                                            >{{ scope.row[item.prop] }}</el-button
                                        >
                                    </span>
                                </template>
                                <template v-else-if="v.typeof === 'editSwitch'">
                                    <span :key="'switch' + index">
                                        <el-switch
                                            v-model="scope.row[item.prop]"
                                            :active-value="'0'"
                                            :inactive-value="'1'"
                                            @change="
                                                () => {
                                                    v.method(scope.$index, scope.row);
                                                }
                                            "
                                        >
                                        </el-switch>
                                    </span>
                                </template>
                            </template>
                        </span>
                    </template>
                    <!-- 格式化状态 -->
                    <template v-else-if="item.formartState">
                        <template v-if="item.formartType === 'icon'">
                            <span :class="['sync-state', 'color-sync-' + scope.row[item.prop]]"> <i class="iconfont iconrenyuanjiankong"></i>{{ scope.row.onlineStatus }} </span>
                        </template>
                        <template v-else-if="item.formartType === 'text'">
                            <span :class="['sync-state', 'color-sync-' + scope.row[item.prop]]">
                                {{ scope.row[item.prop + "Name"] }}
                            </span>
                        </template>
                    </template>
                    <!-- 正常的文本 -->
                    <template v-else>
                        <span>{{ scope.row[item.prop] !== null ? scope.row[item.prop] : "-" }}</span>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="centerClass" v-if="isPage" ref="pageRefs">
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                :pager-count="5"
                layout="prev, pager, next"
                :total="total"
                prev-text="上一页"
                next-text="下一页"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        heightType: {
            type: String,
            default: "auto"
        },
        tableColumns: {
            type: Array,
            required: true,
            default: () => []
        },
        selection: {
            type: Boolean,
            default: true
        },
        number: {
            type: Boolean,
            default: false
        },
        showTable: {
            type: Boolean,
            default: false
        },
        showOverflowTooltip: {
            type: Boolean,
            default: false
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageSizes: {
            type: Array,
            default: () => [10, 20, 50]
        },
        total: {
            type: Number,
            default: 0
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: () => []
        },
        isPage: {
            type: Boolean,
            default: true
        },
        rowKey: {
            type: String,
            default: "id"
        },
        sumCol: {
            type: Boolean,
            default: false
        },
        sumRow: {
            type: Boolean,
            default: false
        },
        sumList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            screenWidth: document.body.clientWidth,
            screenHeight: document.body.clientHeight,
            tableHei: "auto",
            tableMaxHei: "",
            selectArr: [],

            isSetId: 0,
            isSetValue: "",
            sumRowState: this.sumRow,
            heiKey: this.heightType === "auto" ? "max-height" : "height"
        };
    },
    watch: {
        screenWidth() {
            // 监听屏幕宽度变化
            this.ecResize(true);
        },
        screenHeight() {
            // 监听屏幕高度变化
            this.ecResize(true);
        },
        sumRow(newV, oldV) {
            this.tableHei = 0;
            this.$refs.baseTableRefs.doLayout();
            setTimeout(() => {
                this.sumRowState = newV;
                this.ecResize(true);
            }, 100);
        }
    },
    mounted() {
        let _that = this;
        let setTime;

        window.addEventListener("resize", () => {
            if (setTime) {
                clearTimeout(setTime);
            }
            setTime = setTimeout(() => {
                _that.screenWidth = document.body.clientWidth;
                _that.screenHeight = document.body.clientHeight;
            }, 200);
        });

        this.ecResize(false);
    },
    methods: {
        ecResize(state) {
            if (this.heightType === "calc") {
                // 表格高度：容器高度 - 表头 - 分页
                setTimeout(() => {
                    let boxHei = this.$refs.tableHeiRefs.offsetHeight;
                    let pagesHei = 0;
                    if (this.isPage) {
                        let pageHei = this.$refs.pageRefs.offsetHeight;
                        pagesHei = pageHei;
                    }

                    this.tableHei = boxHei - pagesHei + "px";
                    if (state) {
                        this.$refs.baseTableRefs.doLayout();
                    }
                }, 400);
            } else {
                this.tableHei = this.heightType;
                if (state) {
                    this.$refs.baseTableRefs.doLayout();
                }
            }
        },
        // 返回合计行内容
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            if (this.sumRow) {
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = "总计";
                        return;
                    } else if (column.type !== "default") {
                        sums[index] = "/";
                        return;
                    }
                    if (this.sumList.length > 0) {
                        let label = this.sumList[0][column.property];
                        if (label) {
                            sums[index] = label;
                        } else {
                            sums[index] = "/";
                        }
                    } else {
                        sums[index] = "/";
                    }
                });
            }

            return sums;
        },
        // 点击行
        rowClick(row) {
            this.$emit("rowClick", row);
        },
        // 清除选中的数据
        clearSelectChange() {
            this.$refs.baseTableRefs.clearSelection();
        },
        // checkbox 修改
        handleSelectionChange(selRows) {
            this.selectArr = selRows;
        },
        // 每页显示的条数修改
        handleSizeChange(pageSize) {
            if (this.isPage) {
                this.$emit("changeCurrentData", {
                    pageSize,
                    currentPage: 1
                });
            }
        },
        // 页面跳转
        handleCurrentChange(currentPage) {
            if (this.isPage) {
                this.$emit("changeCurrentData", {
                    currentPage
                });
            }
        },
        // 页面根据字段排序
        sortChange(column) {
            if (this.isPage) {
                this.$emit("changeCurrentData", {
                    sort_name: column.prop,
                    sort_way: column.order
                });
            }
        },
        // 计算序号
        indexMethod(index) {
            return 10 * (this.currentPage - 1) + index + 1;
        }
    },
    filters: {
        disabledState(row, prop, val) {
            if (prop !== "" && prop != null) {
                let tf = false;
                for (let i = 0; i < val.length; i++) {
                    if (val[i] === row[prop]) {
                        tf = true;
                        break;
                    }
                }
                return tf;
            } else {
                return false;
            }
        },
        getTimes(val) {
            if (val != "" && val != null) {
                let date = new Date(val);
                date.setHours(date.getHours() - 14);
                let times = date.getTime();
                return times;
            } else {
                return "-";
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/components/BaseTable/index.scss";
::v-deep {
    .el-table {
        th {
            padding: 8px 0 !important;
            .cell {
                font-size: 12px !important;
            }
        }
        td {
            padding: 6px 0 !important;
            .cell {
                font-size: 12px !important;
            }
            .cell .el-button {
                padding: 0 2px !important;
            }
        }
    }
}
</style>
