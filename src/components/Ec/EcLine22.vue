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

            // 绘制图表
            let offsetX = 12;
            let offsetY = 6;
            let yNum = 57;
            if (dataZoom) {
                offsetX = 8;
                offsetY = 4;
                yNum = 55;
            }

            // 绘制左侧面
            const CubeLeft = this.$echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0
                },
                buildPath: function (ctx, shape) {
                    // 会canvas的应该都能看得懂，shape是从custom传入的
                    const xAxisPoint = shape.xAxisPoint;
                    // console.log(shape);
                    const c0 = [shape.x, shape.y];
                    const c1 = [shape.x - offsetX, shape.y - offsetY];
                    const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1]];
                    const c3 = [xAxisPoint[0], xAxisPoint[1]];
                    ctx.moveTo(c0[0], c0[1])
                        .lineTo(c1[0], c1[1])
                        .lineTo(c2[0], c2[1] - yNum)
                        .lineTo(c3[0], c3[1] - yNum)
                        .closePath();
                }
            });
            const CubeLeft2 = this.$echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0
                },
                buildPath: function (ctx, shape) {
                    // 会canvas的应该都能看得懂，shape是从custom传入的
                    const xAxisPoint = shape.xAxisPoint;
                    // console.log(shape);
                    const c0 = [shape.x, shape.y];
                    const c1 = [shape.x - offsetX, shape.y - offsetY];
                    const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
                    const c3 = [xAxisPoint[0], xAxisPoint[1]];
                    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
                }
            });
            // 绘制右侧面
            const CubeRight = this.$echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0
                },
                buildPath: function (ctx, shape) {
                    const xAxisPoint = shape.xAxisPoint;
                    const c1 = [shape.x, shape.y];
                    const c2 = [xAxisPoint[0], xAxisPoint[1]];
                    const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1]];
                    const c4 = [shape.x + offsetX, shape.y - offsetY];
                    ctx.moveTo(c1[0], c1[1])
                        .lineTo(c2[0], c2[1] - yNum)
                        .lineTo(c3[0], c3[1] - yNum)
                        .lineTo(c4[0], c4[1])
                        .closePath();
                }
            });
            const CubeRight2 = this.$echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0
                },
                buildPath: function (ctx, shape) {
                    const xAxisPoint = shape.xAxisPoint;
                    const c1 = [shape.x, shape.y];
                    const c2 = [xAxisPoint[0], xAxisPoint[1]];
                    const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
                    const c4 = [shape.x + offsetX, shape.y - offsetY];
                    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
                }
            });
            // 绘制顶面
            const CubeTop2 = this.$echarts.graphic.extendShape({
                shape: {
                    x: 0,
                    y: 0
                },
                buildPath: function (ctx, shape) {
                    const c1 = [shape.x, shape.y];
                    const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
                    const c3 = [shape.x, shape.y - offsetX];
                    const c4 = [shape.x - offsetX, shape.y - offsetY];
                    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
                }
            });
            // 注册三个面图形
            this.$echarts.graphic.registerShape("CubeLeft", CubeLeft);
            this.$echarts.graphic.registerShape("CubeRight", CubeRight);
            this.$echarts.graphic.registerShape("CubeLeft2", CubeLeft2);
            this.$echarts.graphic.registerShape("CubeRight2", CubeRight2);
            this.$echarts.graphic.registerShape("CubeTop2", CubeTop2);

            const topVal = 0.5;

            const colorFill1 = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: "rgba(22, 101, 194, 1)"
                },
                {
                    offset: 1,
                    color: "rgba(22, 101, 194, 0.3)"
                }
            ]);
            const colorFill2 = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: "rgba(27, 126, 242, 1)"
                },
                {
                    offset: 1,
                    color: "rgba(27, 126, 242, 0.3)"
                }
            ]);
            const colorFill3 = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: "#20c1c8"
                },
                {
                    offset: 1,
                    color: "#28F1FA"
                }
            ]);
            const colorFill4 = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: "#28F1FA"
                },
                {
                    offset: 1,
                    color: "#28F1FA"
                }
            ]);
            let option = {
                tooltip: {
                    show: true,
                    trigger: "axis",
                    formatter: function (params, ticket, callback) {
                        let param = params[0];
                        let tool = `${param.name}<br/>${param.marker}${param.seriesName}：${param.value}`;
                        return tool;
                    }
                },
                grid: {
                    left: 12,
                    right: 15,
                    top: 30,
                    bottom: 15,
                    containLabel: true
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
                yAxis: {
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
                series: [
                    {
                        name: sName,
                        type: "custom",
                        renderItem: (params, api) => {
                            const location = api.coord([api.value(0), api.value(1)]);
                            return {
                                type: "group",
                                children: [
                                    {
                                        type: "CubeLeft",
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: api.value(1),
                                            x: location[0],
                                            y: location[1],
                                            xAxisPoint: api.coord([api.value(0), 0])
                                        },
                                        style: {
                                            fill: colorFill1
                                        }
                                    },
                                    {
                                        type: "CubeRight",
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: api.value(1),
                                            x: location[0],
                                            y: location[1],
                                            xAxisPoint: api.coord([api.value(0), 0])
                                        },
                                        style: {
                                            fill: colorFill2
                                        }
                                    }
                                ]
                            };
                        },
                        data: sData
                    },
                    {
                        type: "custom",
                        renderItem: (params, api) => {
                            const location = api.coord([api.value(0), api.value(1) + topVal]);
                            return {
                                type: "group",
                                children: [
                                    {
                                        type: "CubeLeft2",
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: topVal,
                                            x: location[0],
                                            y: location[1],
                                            xAxisPoint: api.coord([api.value(0), api.value(1)])
                                        },
                                        style: {
                                            fill: colorFill3
                                        }
                                    },
                                    {
                                        type: "CubeRight2",
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: topVal,
                                            x: location[0],
                                            y: location[1],
                                            xAxisPoint: api.coord([api.value(0), api.value(1)])
                                        },
                                        style: {
                                            fill: colorFill3
                                        }
                                    },
                                    {
                                        type: "CubeTop2",
                                        shape: {
                                            api,
                                            xValue: api.value(0),
                                            yValue: topVal,
                                            x: location[0],
                                            y: location[1],
                                            xAxisPoint: api.coord([api.value(0), api.value(1)])
                                        },
                                        style: {
                                            fill: colorFill4
                                        }
                                    }
                                ]
                            };
                        },
                        data: sData
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
