<template>
    <div class="ec-line" :id="ecDom" ref="myChart"></div>
</template>
<script>
export default {
    name: "EcLine2", // 折线
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
                yName, // 名称
                yUnit, // 单位
                xData, // x轴数据
                sData, // 数值
                boundaryGap, // 是否顶头
                smooth, // 是否平滑
                labelColor,
                value2,
                value3
            } = this.ecLine;

            if (boundaryGap == null) {
                boundaryGap = true;
            }
            if (smooth == null) {
                smooth = false;
            }

            // 绘制图表
            let option = {
                grid: {
                    left: 10,
                    right: 14,
                    top: 30,
                    bottom: 0,
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    trigger: "axis",
                    confine: true,
                    formatter: function (params, ticket, callback) {
                        let param = params[0];
                        let tool = `${param.name}<br/>${param.marker}${param.seriesName}：${param.value} ${yUnit}`;
                        return tool;
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
                        fontSize: 12,
                        formatter: "{value}号"
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
                            color: "rgba(154, 154, 154, 0.23)"
                        }
                    }
                },
                series: [
                    {
                        name: yName,
                        data: sData,
                        type: "bar",
                        symbolSize: 1,
                        smooth: smooth,
                        itemStyle: {
                            color: "#41BEFF"
                        },
                        barWidth: "32%",
                        barMaxWidth: 20,
                        emphasis: {
                            lineStyle: {
                                width: 2
                            }
                        },
                        markLine: {
                            symbol: "none",
                            data: [
                                {
                                    name: "雨量超标线",
                                    symbol: "none",
                                    yAxis: value2,
                                    label: { show: false },
                                    lineStyle: { width: 1, color: "#B13E44", type: "solid" }
                                }
                            ],
                            emphasis: {
                                disabled: true
                            }
                        }
                    }
                ]
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
