<template>
    <div class="ec-line" :id="ecDom" ref="myChart"></div>
</template>
<script>
export default {
    name: "EcLine1", // 折线
    props: ["ecLine"],
    data() {
        return {
            screenWidth: document.body.clientWidth,
            screenHeight: document.body.clientHeight,
            ecDom: "myChart",
            myChart: null
        };
    },
    watch: {
        screenWidth: function () {
            //监听屏幕宽度变化
            this.ecResize();
        },
        screenHeight: function () {
            //监听屏幕高度变化
            this.ecResize();
        },
        ecLine: {
            deep: true,
            handler(newVal) {
                this.drawLine();
            }
        }
    },
    // 页面渲染前，调用接口准备数据
    created() {
        this.ecDom = "myChart" + this.ecLine.id;
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
            }, 1000);
        });

        this.drawLine();
    },
    methods: {
        ecResize() {
            this.myChart.resize();
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            var bar_dv = this.$refs.myChart;
            this.myChart = this.$echarts.init(bar_dv);
            let {
                legend,
                yName, // 名称
                yUnit, // 单位
                xData, // x轴数据
                sData, // 数值
                boundaryGap, // 是否顶头
                smooth, // 是否平滑
                labelColor
            } = this.ecLine;

            if (boundaryGap == null) {
                boundaryGap = true;
            }
            if (smooth == null) {
                smooth = false;
            }

            let seriesArr = [];
            if (sData && sData.length) {
                sData.forEach((item) => {
                    seriesArr.push({
                        name: item.name,
                        data: item.data,
                        type: "line",
                        symbolSize: 6,
                        smooth: smooth,
                        itemStyle: {
                            color: item.color
                        },
                        lineStyle: {
                            width: 2
                        },
                        emphasis: {
                            lineStyle: {
                                width: 2
                            }
                        }
                    });
                });
            }

            // 绘制图表
            let option = {
                grid: {
                    left: 10,
                    right: 10,
                    top: 40,
                    bottom: 20,
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    trigger: "axis",
                    confine: true
                },
                legend: {
                    show: legend,
                    top: "8px",
                    textStyle: {
                        color: labelColor
                    }
                },
                xAxis: {
                    type: "category",
                    boundaryGap: boundaryGap,
                    axisLine: {
                        // 轴
                        lineStyle: {
                            color: "rgba(126, 126, 126, 0.5)"
                        }
                    },
                    axisTick: {
                        // 刻度
                        show: false
                    },
                    axisLabel: {
                        // 刻度
                        color: labelColor,
                        fontSize: 12
                    },
                    splitLine: {
                        // 隔线
                        show: false
                    },
                    data: xData
                },
                yAxis: {
                    type: "value",
                    name: yUnit,
                    nameTextStyle: {
                        color: labelColor
                    },
                    // splitNumber: 5,
                    boundaryGap: [0, "5%"],
                    axisLine: {
                        // 轴
                        show: false
                    },
                    axisTick: {
                        // 刻度
                        show: false
                    },
                    axisLabel: {
                        // 刻度
                        color: labelColor,
                        fontSize: 12
                    },
                    splitLine: {
                        // 隔线
                        show: true,
                        lineStyle: {
                            color: "#1e3567"
                        }
                    }
                },
                series: seriesArr
            };
            this.myChart.setOption(option);

            // this.myChart.off('click');
            // this.myChart.on('click', (params) => {
            //     let idx2 = Math.abs(params.dataIndex - (checkData.length - 1));
            //     this.$parent.checkThis(idx2);
            // });
        }
    }
};
</script>
<style scoped>
.ec-line {
    width: 100%;
    height: 100%;
}
</style>
