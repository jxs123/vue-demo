<template>
    <div class="ec-line" :id="ecDom" ref="myChart"></div>
</template>
<script>
export default {
    name: "EcLine1", // 渐变柱状图
    props: ["ecLine"],
    data() {
        return {
            screenWidth: document.body.clientWidth,
            screenHeight: document.body.clientHeight,
            ecDom: "myChart",
            myChart: null
        };
    },
    computed: {
        isTest() {
            return this.config.role.isShow;
        }
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
    created() {},
    mounted() {
        this.ecDom = "myChart" + this.ecLine.id;
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
        downloadEc() {
            const link = document.createElement("a");
            link.download = "河道涉水事件";
            link.style.display = "none";
            link.href = this.myChart.getDataURL({
                type: "png",
                pixelRatio: 1.5,
                backgroundColor: "#122539"
            }); // 导出图表图片，返回一个 base64 的 URL
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href); //释放URL对象
            document.body.removeChild(link);
        },
        ecResize() {
            this.myChart.resize();
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            var bar_dv = this.$refs.myChart;
            this.myChart = this.$echarts.init(bar_dv);
            let { legend, yUnit, yName, xData, sName, sData, colorList, barWidth, labelColor, dataZoom, zoomSt, zoomEt } = this.ecLine;

            if (dataZoom) {
                barWidth = "30%";
            }

            let s2Data = [];
            for (let i = 0; i < sData.length; i++) {
                s2Data.push(1);
            }

            let colorline = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colorList[0] },
                { offset: 1, color: colorList[1] }
            ]);

            // 绘制图表
            let option = {
                grid: {
                    left: 12,
                    right: 15,
                    top: 30,
                    bottom: 15,
                    containLabel: true
                },
                legend: {
                    show: legend,
                    top: 0,
                    right: 30,
                    textStyle: {
                        color: "#ffffff"
                    }
                },
                tooltip: {
                    show: true,
                    trigger: "axis",
                    formatter: function (params, ticket, callback) {
                        let param = params[0];
                        let tool = `${param.name}<br/>${param.marker}${param.seriesName}：${param.value}`;
                        return tool;
                    }
                },
                xAxis: {
                    type: "category",
                    axisLabel: {
                        interval: 0,
                        showMinLabel: true,
                        showMaxLabel: true,
                        color: labelColor,
                        padding: 0,
                        overflow: "break"
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    data: xData
                },
                yAxis: [
                    {
                        type: "value",
                        name: yUnit,
                        nameGap: 15,
                        nameTextStyle: {
                            color: labelColor
                        },
                        splitNumber: 5,
                        axisLabel: {
                            color: labelColor
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(154, 154, 154, 0.23)"
                            }
                        },
                        scale: true
                    },
                    {
                        type: "value",
                        show: false
                    }
                ],
                series: [
                    {
                        name: sName,
                        data: sData,
                        type: "bar",
                        smooth: true,
                        showSymbol: false,
                        itemStyle: {
                            borderRadius: [2, 2, 0, 0],
                            color: colorline
                        },
                        barWidth: barWidth ? barWidth : "32%",
                        barMaxWidth: 20,
                        emphasis: {
                            lineStyle: {
                                width: 1
                            }
                        }
                    }
                ]
            };
            if (dataZoom) {
                option.grid.bottom = 25;
                option.dataZoom = [
                    {
                        show: true,
                        height: 10,
                        xAxisIndex: [0],
                        brushSelect: false,
                        showDataShadow: false,
                        bottom: 5,
                        start: zoomSt,
                        end: zoomEt,
                        handleIcon: "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
                        handleSize: "110%",
                        handleStyle: {
                            color: "#d3dee5"
                        },
                        showDetail: false,
                        borderColor: "#90979c"
                    },
                    {
                        type: "inside",
                        show: true,
                        height: 15,
                        start: 1,
                        end: 35
                    }
                ];
            }
            this.myChart.setOption(option, true);

            // this.myChart.off('click');
            // this.myChart.on('click', (params) => {
            //     this.$parent.checkThis(params.dataIndex);
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
