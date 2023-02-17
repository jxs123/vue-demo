<!--
 * @Description: 事件列表
 * @Date: 2022-11-21 15:04:23
-->
<template>
    <div class="event-ec-list flex-1">
        <div class="flex-column event-list" v-show="!isDatail">
            <ul class="item">
                <li v-for="(item, idx) in topData" :key="idx" class="is-top">
                    <span class="title text-overflow" @click="openDetail(item)">{{ item.title }}</span>
                    <span class="date">
                        <span class="top-time">{{ item.time }}</span>
                        <span class="top-btn" @click="topFun(false)">
                            <i class="iconfont iconquxiaozhiding"></i>
                        </span>
                    </span>
                </li>
            </ul>
            <div class="flex-1">
                <vue-seamless-scroll :data="listData" :class-option="optionSingleHeight" class="seamless-warp">
                    <ul class="item">
                        <li v-for="(item, idx) in listData" :key="idx">
                            <span class="title text-overflow" @click="openDetail(item)">{{ item.title }}</span>
                            <span class="date">
                                <span class="top-time">{{ item.time }}</span>
                                <span class="top-btn" @click="topFun(true)">
                                    <i class="iconfont iconzhiding"></i>
                                </span>
                            </span>
                        </li>
                    </ul>
                </vue-seamless-scroll>
            </div>
        </div>
        <!-- 详情 -->
        <div class="event-detail" v-show="isDatail">
            <div class="detail-title">
                <span @click="closeDetail"> <i class="el-icon-arrow-left"></i>详情 </span>
            </div>
            <div class="info-list">
                <div class="info-row em-4">
                    <div class="info-row-tit"><span>事件名称</span>：</div>
                    <div class="info-row-text">{{ detailObj.name1 }}</div>
                </div>
                <div class="info-row em-4">
                    <div class="info-row-tit"><span>事件性质</span>：</div>
                    <div class="info-row-text">{{ detailObj.name2 }}</div>
                </div>
                <div class="info-row em-4">
                    <div class="info-row-tit"><span>事件状态</span>：</div>
                    <div class="info-row-text is-state">{{ detailObj.name3 }}</div>
                </div>
                <div class="info-row em-4">
                    <div class="info-row-tit"><span>负责人</span>：</div>
                    <div class="info-row-text">{{ detailObj.name4 }}</div>
                </div>
                <div class="info-row em-4">
                    <div class="info-row-tit"><span>联系方式</span>：</div>
                    <div class="info-row-text">{{ detailObj.name5 }}</div>
                </div>
                <div class="info-row em-4">
                    <div class="info-row-tit"><span>位置</span>：</div>
                    <div class="info-row-text">{{ detailObj.name6 }}</div>
                </div>
                <div class="info-row em-4">
                    <div class="info-row-tit"><span>事件描述</span>：</div>
                    <div class="info-row-text">{{ detailObj.name7 }}</div>
                </div>
                <div class="info-row em-4">
                    <div class="info-row-tit"><span>现场照片</span>：</div>
                    <div class="info-row-text">
                        <template v-for="(file, idx) in detailObj.name8">
                            <el-image
                                class="info-row-img"
                                :key="'img' + idx"
                                :src="file.url"
                                fit="cover"
                                :preview-src-list="detailObj.name8.map((item) => item.url)"
                            ></el-image>
                        </template>
                    </div>
                </div>
                <div class="info-row em-4">
                    <div class="info-row-tit"><span>处理结果</span>：</div>
                    <div class="info-row-text">{{ detailObj.name9 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueSeamlessScroll from "vue-seamless-scroll";
import hd1File from "@/assets/imgs/index/hd1.png";
import hd2File from "@/assets/imgs/index/hd2.png";
export default {
    components: { VueSeamlessScroll },
    data() {
        return {
            topData: [],
            listData: [],
            isDatail: false,
            detailObj: {
                name1: "为千万亩农田“解渴”",
                name2: "河道破坏",
                name3: "处理中",
                name4: "张三",
                name5: "18688888888",
                name6: "漳河33km处",
                name7: "出现了人为河道破坏行为",
                name8: [{ url: hd1File }, { url: hd2File }],
                name9: "暂未处理"
            }
        };
    },
    computed: {
        optionSingleHeight() {
            return {
                singleHeight: 43,
                waitTime: 2500
            };
        }
    },
    created() {
        this.loadData(false);
    },
    mounted() {},
    beforeDestroy() {},
    methods: {
        // 加载数据
        loadData(state) {
            if (state) {
                this.topData = [
                    { title: "民有渠河道人为破坏", time: "2022-10-14" },
                    { title: "漳河河道范围违法建设", time: "2022-08-29" }
                ];
                this.listData = [
                    { title: "民有渠超警戒水位", time: "2022-08-19" },
                    { title: "漳河超警戒水位", time: "2022-08-17" },
                    { title: "玉泉河超警戒水位", time: "2022-08-17" },
                    { title: "玉泉河河道乱占", time: "2022-08-15" },
                    { title: "漳河违法排污", time: "2022-08-15" },
                    { title: "漳河非法放生", time: "2022-08-12" },
                    { title: "玉泉河倾倒垃圾", time: "2022-06-29" },
                    { title: "民有渠设置拦河渔具", time: "2022-06-17" }
                ];
            } else {
                this.topData = [
                    { title: "民有渠河道人为破坏", time: "2022-10-14" },
                    { title: "漳河河道范围违法建设", time: "2022-08-29" }
                ];
                this.listData = [
                    { title: "民有渠超警戒水位", time: "2022-08-19" },
                    { title: "漳河超警戒水位", time: "2022-08-17" },
                    { title: "玉泉河超警戒水位", time: "2022-08-17" },
                    { title: "玉泉河河道乱占", time: "2022-08-15" },
                    { title: "漳河违法排污", time: "2022-08-15" },
                    { title: "漳河非法放生", time: "2022-08-12" },
                    { title: "玉泉河倾倒垃圾", time: "2022-06-29" },
                    { title: "民有渠设置拦河渔具", time: "2022-06-17" }
                ];
            }
        },
        // 置顶切换
        topFun(state) {
            this.loadData(state);
        },
        // 打开事件详情
        openDetail(row) {
            this.detailObj = {
                name1: "为千万亩农田“解渴”",
                name2: "河道破坏",
                name3: "处理中",
                name4: "张三",
                name5: "18688888888",
                name6: "漳河33km处",
                name7: "出现了人为河道破坏行为",
                name8: [{ url: hd1File }, { url: hd2File }],
                name9: "暂未处理"
            };
            // this.detailObj = row;
            this.isDatail = true;
        },
        // 关闭详情
        closeDetail() {
            this.detailObj = {
                name1: "",
                name2: "",
                name3: "",
                name4: "",
                name5: "",
                name6: "",
                name7: "",
                name8: [],
                name9: ""
            };
            this.isDatail = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.event-ec-list {
    position: relative;
    padding: 10px 14px;
    .event-list {
        height: 100%;
    }
    .seamless-warp {
        height: 100%;
        overflow: hidden;
    }
    .item {
        & > li {
            display: flex;
            height: 33px;
            line-height: 33px;
            margin-bottom: 10px;
            padding: 0 10px;
            color: #dbdbdb;
            background: url("~@/assets/imgs/index/event_2.png") no-repeat center;
            background-size: 100% 100%;
            &.is-top {
                background: url("~@/assets/imgs/index/event_1.png") no-repeat center;
                background-size: 100% 100%;
            }
            .title {
                flex: 1;
                cursor: pointer;
            }
            .date {
                padding: 0 25px 0 20px;
                background: url("~@/assets/imgs/index/event_right.png") no-repeat center right 10px;
                background-size: 12px;
            }
            .top-btn {
                display: none;
                cursor: pointer;
                padding-right: 5px;
                i {
                    font-size: 16px;
                }
            }
            .top-time {
                display: inline-block;
                color: #7d808b;
            }
            &:hover {
                .top-time {
                    display: none;
                }
                .top-btn {
                    display: block;
                }
            }
        }
    }

    .event-detail {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        .detail-title {
            color: #d6d6d6;
            font-size: 14px;
            span {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                padding-right: 10px;
                cursor: pointer;
            }
            i {
                margin-right: 4px;
                font-size: 18px;
                vertical-align: middle;
                margin-top: -2px;
            }
        }
        .info-list {
            height: calc(100% - 40px);
            overflow-y: auto;
            padding: 0 20px 10px 5px;
            .is-state {
                color: var(--el-color-hover);
            }
        }
    }
}
</style>
