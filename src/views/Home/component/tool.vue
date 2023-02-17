<!--
 * @Description: 工具
 * @Date: 2022-11-21 15:04:23
-->
<template>
    <div class="tools-box flex">
        <div>
            <div v-for="(item, idx) in toolsList" :key="idx" @click="toolsChange(idx)" :class="['box-li', { active: item.name === activeName || item.select }]" v-show="item.isShow">
                <el-button type="text" :title="item.name">
                    <i :class="['iconfont', item.icon]"></i>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lastCheckNav: "1", // 记录当前菜单
            activeIdx: "", // 当前工具
            activeName: "", // 当前工具名称
            toolsList: [
                {
                    name: "视角还原",
                    isShow: true,
                    icon: "iconquanping",
                    isActive: false
                },
                {
                    name: "切换",
                    isShow: true,
                    icon: "iconqiehuan",
                    select: false,
                    isActive: false
                },
                {
                    name: "测距",
                    isShow: true,
                    icon: "iconceliang",
                    isActive: true
                },
                {
                    name: "测面",
                    isShow: true,
                    icon: "iconcemian",
                    isActive: true
                }
            ]
        };
    },
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {
        // 工具切换
        toolsChange(i) {
            i = "" + i;
            let { name, isActive, select } = this.toolsList[i];
            let thisName = name;

            let thisState = false;
            // 是否开关状态
            if (isActive) {
                // 点击的和当前选中的不是同一个
                if (i !== this.activeIdx) {
                    // 操作改为开启
                    thisState = true;

                    // 上一个操作不是空
                    if (this.activeIdx !== "") {
                        let lastName = this.toolsList[this.activeIdx].name;
                        if (lastName === "视角还原") {
                            this.checkTools(false, thisName);
                        } else if (lastName === "切换") {
                            this.checkTools(false, thisName);
                        } else if (lastName === "测距") {
                            this.checkTools(false, thisName);
                        } else if (lastName === "测面") {
                            this.checkTools(false, thisName);
                        }
                    }

                    this.activeIdx = i;
                    this.activeName = thisName;
                } else {
                    // 是同一个，执行取消操作
                    this.activeIdx = "";
                    this.activeName = "";
                }

                this.checkTools(thisState, thisName);
            } else {
                this.$set(this.toolsList[i], "select", !select);
                this.checkTools(!select, thisName);
            }
        },
        // 工具执行方法
        checkTools(state, name) {
            if (state) {
                // 打开
                if (name == "测距") {
                    // 调用地图放法
                    this.$bus.emit("initMeasure", true);
                    this.$bus.emit("addInteraction", "LineString");
                } else if (name == "测面") {
                    // 调用地图放法
                    this.$bus.emit("initMeasure", true);
                    this.$bus.emit("addInteraction", "Polygon");
                } else if (name == "视角还原") {
                    // 调用地图放法
                    this.$bus.emit("resetView");
                } else if (name == "切换") {
                    // 调用地图方法
                    this.$bus.emit("switchBaseMap", state);
                }
            } else {
                // 关闭
                if (name == "测距") {
                    // 调用地图放法
                    this.$bus.emit("initMeasure", false);
                    // this.$bus.emit("toolsClick", name, state);
                } else if (name == "测面") {
                    // 调用地图放法
                    this.$bus.emit("initMeasure", false);
                    // this.$bus.emit("toolsClick", name, state);
                } else if (name == "切换") {
                    // 调用地图方法
                    this.$bus.emit("switchBaseMap", state);
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.tools-box {
    position: absolute;
    right: 12px;
    top: 12px;
    z-index: 100;
    box-shadow: 0px 2px 4px rgba(32, 46, 75, 0.2);
    background-color: #00175a;
    border-radius: 2px;
    &.toolsR {
        right: 390px !important;
    }

    .box-li {
        padding: 0 7px;
    }

    .el-button--text {
        width: 28px;
        height: 46px;
        // color: #fff;
        color: #d4d4d4;
        border-top: 1px solid rgba(255, 255, 255, 0.09);
        border-radius: 0;
    }
    .box-li:first-child .el-button--text {
        border-top: 0;
    }
    .el-button--text i {
        font-size: 20px;
    }

    .el-button--text:focus,
    .el-button--text:active {
        border-top-color: rgba(255, 255, 255, 0.09);
    }
    .el-button--text:hover {
        border-top-color: rgba(255, 255, 255, 0.09);
        color: var(--el-color-hover);
    }

    .active .el-button--text {
        color: var(--el-color-hover);
    }
}
</style>
