<template>
    <div class="ec-line" :id="ecDom" ref="myChart"></div>
</template>
<script>
export default {
    name: "EcLine9", // 圆环
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
            immediate: false,
            handler(newVal) {
                this.drawLine(2);
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

        this.drawLine(1);
    },
    methods: {
        downloadEc() {
            const link = document.createElement("a");
            link.download = "河道涉水事件-饼图";
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
        drawLine(num) {
            // 基于准备好的dom，初始化echarts实例
            var bar_dv = this.$refs.myChart;
            this.myChart = this.$echarts.init(bar_dv);
            let {
                vUnit = "",
                radiusList = ["60%", "70%"],
                center = ["50%", "50%"],
                sData = [],
                legend = {},
                xData = [],
                colorStr,
                label = true,
                colorList = [
                    "#FF9450",
                    "#4ECCCB",
                    "#21A264",
                    "#f56b6d",
                    "#c065e7",
                    "#d5f69b",
                    "#22f2e5",
                    "#765deb",
                    "#2ca4fb",
                    "#3862d8",
                    "#E271DE",
                    "#6a89E2",
                    "#F5855F",
                    "#FFC53D",
                    "#219CF9",
                    "#6efbbf",
                    "#40c057",
                    "#ffd351",
                    "#ff8e43"
                ]
            } = this.ecLine;
            let datas = [];
            let count = 0;
            xData.forEach((item, i) => {
                count += Number(sData[i]);
                var obj = {
                    value: sData[i],
                    name: item,
                    // rate: (sData[i] / sum) * 100,
                    label: {
                        normal: {
                            show: label,
                            color: colorList[i]
                        }
                    },
                    itemStyle: {
                        normal: {
                            show: label,
                            color: colorList[i]
                        }
                    }
                };
                datas.push(obj);
            });
            // 绘制图表
            let option = {
                grid: {
                    left: 10,
                    right: 10,
                    top: 30,
                    bottom: 18,
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    trigger: "item",
                    formatter: function (params, ticket, callback) {
                        let tool = `${params.marker}${params.name}<br/>数量：${params.value}${vUnit}<br/>占比：${params.percent}%`;
                        return tool;
                    }
                },
                legend: {},
                color: colorList,
                series: [
                    {
                        type: "pie",
                        radius: radiusList,
                        center: center,
                        startAngle: 140,
                        hoverAnimation: true,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: label,
                                    formatter: function (params) {
                                        // if (params.name) {
                                        //     return params.name + "：" + params.value + vUnit;
                                        // } else {
                                        return params.value;
                                        // }
                                    }
                                },
                                labelLine: {
                                    show: true
                                }
                            }
                        },
                        data: datas
                    }
                ]
            };
            if (legend) {
                for (const key in legend) {
                    const element = legend[key];
                    option.legend[key] = element;
                    if ((key == "show") & element) {
                        option.legend.data = xData;
                    }
                }
            }
            if (colorStr) {
                var Y = 50,
                    isTop = Number(center[1].split("%")[0]);
                if (typeof isTop != "number") isTop = Y;
                option.title = {
                    text: count + "个",
                    // x: center[0],
                    // y: center[1],
                    x: "center",
                    // y: "center",
                    // y: x - isTop + "%",
                    y: isTop - 4 + "%",
                    textStyle: {
                        fontSize: 14,
                        color: colorStr
                    }
                };
            }
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
