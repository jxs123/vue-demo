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
            style="width: 100%"
            :data="list"
            :border="border"
            @sort-change="sortChange"
            @selection-change="handleSelectionChange"
            :[heiKey]="tableHei == 'auto' ? '100%' : tableHei"
            :row-key="rowKey"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            @row-click="rowClick"
            v-loading="isLoading"
            element-loading-background="rgba(0, 0, 0, 0.2)"
        >
            <!-- 复选框 -->
            <template v-if="selection">
                <el-table-column type="selection" width="70px" align="center" :reserve-selection="true" />
            </template>

            <!-- 序号 -->
            <template v-if="number">
                <el-table-column type="index" :index="indexMethod" label="序号" :width="numberW" align="center" />
            </template>

            <el-table-column
                v-for="(item, key) in tableColumns"
                :key="key"
                :label="item.label"
                :prop="item.prop"
                :width="item.width ? item.width + '' : ''"
                min-width="60"
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
                                <template v-if="v.typeof === 'link'">
                                    <span :key="'link' + index">
                                        <el-button
                                            :class="[{ 'm-l-xs': index != 0 }, 'btn-link', v.typecolor ? 'btn-text-' + v.typecolor : 'btn-text-primary']"
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
                            </template>
                        </span>
                    </template>
                    <!-- 格式化状态 -->
                    <template v-else-if="item.formart">
                        <template v-if="item.formart === 'numStateColor'">
                            <span :class="'btn-text-' + getStateColor(scope.row[item.formartVal])">{{ indexMethod(scope.$index) }}</span>
                        </template>
                        <template v-if="item.formart === 'arr'">
                            <template v-for="(item2, idx2) in item.formartVal">
                                <span :key="idx2"
                                    >{{ scope.row[item.formartVal[0]] !== null ? scope.row[item.formartVal[0]] : "/" }}({{
                                        scope.row[item.formartVal[1]] !== null ? scope.row[item.formartVal[0]] : "/"
                                    }})</span
                                >
                            </template>
                        </template>
                        <template v-if="item.formart === 'tooltip'">
                            <span
                                >{{ scope.row[item.prop] ? scope.row[item.prop] : "/" }}
                                <el-tooltip class="item" effect="dark" :content="scope.row[item.formartVal]" placement="top-end">
                                    <i class="iconfont icondianhua"></i>
                                </el-tooltip>
                            </span>
                        </template>
                        <template v-if="item.formart === 'stateColor'">
                            <span :class="'btn-text-' + getStateColor(scope.row[item.formartVal])">{{ scope.row[item.prop] ? scope.row[item.prop] : "/" }}</span>
                        </template>
                    </template>
                    <!-- 正常的文本 -->
                    <template v-else>
                        <span>{{ scope.row[item.prop] !== null ? scope.row[item.prop] : "/" }}</span>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="centerClass" v-if="isPage" ref="pageRefs">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                :pager-count="5"
                :layout="'total,prev,pager,next'"
                :total="total"
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
        numberW: {
            type: String,
            default: "100px"
        },
        border: {
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
            default: () => [10, 15, 20]
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

                    this.tableHei = boxHei - pagesHei - 2 + "px";
                    if (state) {
                        this.$refs.baseTableRefs.doLayout();
                    }
                }, 100);
            } else {
                this.tableHei = this.heightType;
                if (state) {
                    this.$refs.baseTableRefs.doLayout();
                }
            }
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
            return this.pageSize * (this.currentPage - 1) + index + 1;
        },
        getStateColor(type) {
            let colorStr = "white";
            switch (type) {
                case "1":
                    colorStr = "green";
                    break;
                case "2":
                    colorStr = "blue";
                    break;
                case "3":
                    colorStr = "yellow";
                    break;
                case "4":
                    colorStr = "grey";
                    break;
            }
            return colorStr;
        },
        // 根据状态判断是否显示按钮
        showState(arr, val) {
            let tf = false;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === val) {
                    tf = true;
                    break;
                }
            }
            return tf;
        },
        // 滚动到顶部
        toScrollTop() {
            this.$nextTick(() => {
                this.$refs.baseTableRefs.bodyWrapper.scrollTop = 0;
            });
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
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/components/BaseTable/index.scss";
</style>
