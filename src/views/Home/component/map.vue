<!--
 * @Description: 地图
 * @Date: 2022-11-21 15:04:23
-->
<template>
    <div class="box-map" id="mapBox"></div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { Tianditu } from "@supermap/iclient-ol";
import ImageWMS from "ol/source/ImageWMS";
import TileLayer from "ol/layer/Tile";
import ImageLayer from "ol/layer/Image";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import VectorLayer from "ol/layer/Vector";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Circle from "ol/style/Circle";
import GeoJSON from "ol/format/GeoJSON";
import Icon from "ol/style/Icon";
import { getArea, getLength } from "ol/sphere";
import { unByKey } from "ol/Observable";
import Draw from "ol/interaction/Draw";
import { getVEC_CLayer } from "@/utils/tiandituLayers";
import { LineString, Polygon } from "ol/geom";
import { toStringHDMS } from "ol/coordinate";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";

import HydroIcon from "@/assets/imgs/icon/HydroStation.png";
import WaterIcon from "@/assets/imgs/icon/WaterStation.png";
import DroneIcon from "@/assets/imgs/icon/Drone.png";
import RainIcon from "@/assets/imgs/icon/RainStation.png";
import AlertIcon from "@/assets/imgs/icon/Alert.png";
import CCTVIcon from "@/assets/imgs/icon/CCTV.png";
import GateIcon from "@/assets/imgs/icon/Gate.png";
import PondingIcon from "@/assets/imgs/icon/Ponding.png";
export default {
    props: {
        loadType: {
            type: String,
            default: "1"
        }
    },
    data() {
        return {};
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            this.initMap();
            //暴露方法
            this.$bus.on("resetView", () => this.resetView());
            this.$bus.on("switchBaseMap", (state) => this.switchBaseMap(state));
            this.$bus.on("addInteraction", (type) => this.addInteraction(type));
            this.$bus.on("addFeatureData", (name, state) => this.addFeatureData(name, state));
            this.$bus.on("initMeasure", (state) => this.initMeasure(state));
        });
    },
    beforeDestroy() {
        //销毁方法
        this.$bus.$off("resetView");
        this.$bus.$off("switchBaseMap");
        this.$bus.$off("addInteraction");
        this.$bus.$off("addFeatureData");
        this.$bus.$off("initMeasure");
    },
    methods: {
        /**
         * 初始化地图容器
         */
        initMap() {
            const _self = this;
            _self.initCenter = [114.92, 36.24];
            _self.initZoom = 11.5;
            _self.view = new View({
                center: _self.initCenter,
                zoom: _self.initZoom,
                projection: "EPSG:4326",
                enableRotation: false,
                extent: [114.2, 35.8, 115.7, 36.7]
            });
            _self.map = new Map({
                target: "mapBox", // div-id
                view: _self.view
            });
            //初始化样式
            this.initStyle();
            //添加默认底图
            this.addBaseMap();
            //添加默认数据图层
            this.addData();
            //打开点查
            this.identify();
            //默认加载图层
            if (this.loadType === "1") {
                // 首页
                this.addFeatureData("监控", true);
                this.addFeatureData("无人机", true);
                this.addFeatureData("水文站", true);
                this.addFeatureData("水质站", true);
                this.addFeatureData("雨量站", true);
                this.addFeatureData("告警", true);
            } else if (this.loadType === "2") {
                this.addFeatureData("告警", true);
                this.addFeatureData("闸泵", true);
                this.addFeatureData("积水点", true);
                // 防汛专题
            } else if (this.loadType === "3") {
                // 水雨情专题
                this.addFeatureData("水文站", true);
                this.addFeatureData("水质站", true);
                this.addFeatureData("雨量站", true);
                this.addFeatureData("告警", true);
            } else if (this.loadType === "4") {
                this.addFeatureData("告警", true);
                // 告警专题
            } else if (this.loadType === "5") {
                // 无人机专题
                this.addFeatureData("监控", true);

                this.addFeatureData("无人机", true);
            }
            // this.addFeatureData("闸泵", true);

            //打开鼠标位置
            this.mousePosition();
        },
        /**
         * 点查
         */
        identify() {
            let _self = this;
            _self.map.on("click", function (evt) {
                const feature = _self.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                    return feature;
                });
                let featureType;
                _self.$bus.emit("openDetail", {
                    show: false
                });
                if (feature) {
                    switch (feature.getProperties().type) {
                        case "监控":
                            featureType = "1";
                            break;
                        case "无人机":
                            featureType = "2";
                            break;
                        case "水文站":
                            featureType = "3";
                            break;
                        case "水质站":
                            featureType = "4";
                            break;
                        case "雨量站":
                            featureType = "5";
                            break;
                        case "河流":
                            featureType = "6";
                            break;
                        case "闸口":
                            featureType = "7";
                            break;
                        case "排水闸泵":
                            featureType = "8";
                            break;
                        case "积水点":
                            featureType = "9";
                            break;
                        case "告警":
                            featureType = "10";
                            break;
                        default:
                            featureType = "0";
                            break;
                    }
                    _self.$bus.emit("openDetail", {
                        show: true,
                        type: featureType,
                        id: "0"
                    });
                } else {
                    _self.$bus.emit("openDetail", {
                        show: false
                    });
                }
            });
        },
        /**
         * 添加底图
         */
        addBaseMap() {
            let _self = this;
            let key = "eeb0f09a2c6f8e01180b6dfb5923123e";
            _self.TDTimgLayer = new TileLayer({
                source: new Tianditu({
                    layerType: "img",
                    key: key
                }),
                id: "TDTimg",
                zIndex: -1
            });
            _self.TDTimgLabelLayer = new TileLayer({
                source: new Tianditu({
                    layerType: "img",
                    isLabel: true,
                    key: key
                }),
                id: "TDTimgLabel",
                zIndex: -1
            });
            _self.TDTvecLayer = new TileLayer({
                source: new Tianditu({
                    layerType: "vec",
                    key: key
                }),
                id: "TDTvec",
                zIndex: -1
            });
            _self.TDTvecLabelLayer = new TileLayer({
                source: new Tianditu({
                    layerType: "vec",
                    isLabel: true,
                    key: key
                }),
                id: "TDTvecLabel",
                zIndex: -1
            });

            const mapServer = process.env.VUE_APP_MAP_SERVER;
            //切片名
            var gridNames = [
                "EPSG:4326:0",
                "EPSG:4326:1",
                "EPSG:4326:2",
                "EPSG:4326:3",
                "EPSG:4326:4",
                "EPSG:4326:5",
                "EPSG:4326:6",
                "EPSG:4326:7",
                "EPSG:4326:8",
                "EPSG:4326:9",
                "EPSG:4326:10",
                "EPSG:4326:11",
                "EPSG:4326:12",
                "EPSG:4326:13",
                "EPSG:4326:14",
                "EPSG:4326:15",
                "EPSG:4326:16",
                "EPSG:4326:17",
                "EPSG:4326:18",
                "EPSG:4326:19",
                "EPSG:4326:20",
                "EPSG:4326:21"
            ];
            //切片大小
            var resolutions = [
                0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625,
                0.00274658203125, 0.001373291015625, 6.866455078125e-4, 3.4332275390625e-4, 1.71661376953125e-4, 8.58306884765625e-5,
                4.291534423828125e-5, 2.1457672119140625e-5, 1.0728836059570312e-5, 5.364418029785156e-6, 2.682209014892578e-6,
                1.341104507446289e-6, 6.705522537231445e-7, 3.3527612686157227e-7
            ];

            _self.tileImgLayer = new TileLayer({
                source: new WMTS({
                    //服务地址
                    url: mapServer + "/geoserver/gwc/service/wmts",
                    layer: "weixian:img",
                    //切片集
                    matrixSet: "EPSG:4326",
                    format: "image/png",
                    projection: "EPSG:4326",
                    //切片信息
                    tileGrid: new WMTSTileGrid({
                        tileSize: [256, 256],
                        extent: [-180.0, -90.0, 180.0, 90.0], //范围
                        origin: [-180.0, 90.0],
                        resolutions: resolutions,
                        matrixIds: gridNames
                    }),
                    //
                    style: "raster",
                    wrapX: true
                }),

                zIndex: -1
            });

            //行政边界-影像
            _self.borderLayer = new ImageLayer({
                source: new ImageWMS({
                    url: mapServer + "/geoserver/weixian/wms",
                    params: {
                        LAYERS: "weixian:魏县_乡镇边界"
                    },
                    serverType: "geoserver"
                }),
                id: "borderlayer",
                zIndex: 8
            });
            //行政边界-矢量
            _self.borderLayer2 = new ImageLayer({
                source: new ImageWMS({
                    url: mapServer + "/geoserver/weixian/wms",
                    params: {
                        LAYERS: "weixian:魏县_乡镇边界2"
                    },
                    serverType: "geoserver"
                }),
                id: "borderlayer2",
                zIndex: 8
            });

            //添加影像
            // _self.map.addLayer(_self.TDTimgLayer);
            _self.map.addLayer(_self.tileImgLayer);
            // _self.map.addLayer(_self.TDTimgLabelLayer);
            //添加乡镇边界
            _self.map.addLayer(_self.borderLayer);

            //初始化矢量
            // _self.TDTGreyVecLayer = getVEC_CLayer();
        },
        /**
         * 切换底图
         * @param {状态} state  true：矢量，false：影像
         */
        switchBaseMap(state) {
            let _self = this;
            if (state === true) {
                //添加矢量，移除影像
                // _self.map.removeLayer(_self.TDTimgLayer);
                _self.map.removeLayer(_self.tileImgLayer);
                _self.map.removeLayer(_self.borderLayer);

                // _self.map.removeLayer(_self.TDTimgLabelLayer);
                // _self.map.addLayer(_self.TDTGreyVecLayer, 0);
                // _self.map.addLayer(_self.TDTvecLabelLayer, 1);
                _self.map.addLayer(_self.borderLayer2, 8);
            } else if (state === false) {
                //添加影像，移除矢量
                _self.map.removeLayer(_self.borderLayer2);
                // _self.map.removeLayer(_self.TDTGreyVecLayer);
                // _self.map.removeLayer(_self.TDTvecLabelLayer);
                // _self.map.addLayer(_self.TDTimgLayer, 0);
                _self.map.addLayer(_self.tileImgLayer, 0);
                _self.map.addLayer(_self.borderLayer, 8);

                // _self.map.addLayer(_self.TDTimgLabelLayer, 1);
            }
        },
        /**
         * 重置视角
         */
        resetView() {
            let _self = this;
            _self.view.animate({ zoom: _self.initZoom }, { center: _self.initCenter }, { duration: 1000 });
        },
        /**
         * 添加测试数据
         */
        addData() {
            const mapServer = process.env.VUE_APP_MAP_SERVER;
            let _self = this;

            //蒙版图层
            let maskLayer = new ImageLayer({
                extent: [113.87118643744209, 35.27737212879301, 116.08646463387011, 36.99741162405179],
                source: new ImageWMS({
                    url: mapServer + "/geoserver/weixian/wms",
                    params: {
                        LAYERS: "weixian:蒙版"
                    },
                    ratio: 1,
                    serverType: "geoserver",
                    zIndex: 20
                })
            });
            // _self.map.addLayer(maskLayer);
            //县界
            let xianLayer = new ImageLayer({
                source: new ImageWMS({
                    url: mapServer + "/geoserver/weixian/wms",
                    params: {
                        LAYERS: "weixian:魏县县界1"
                    },
                    serverType: "geoserver"
                }),
                id: "xianLayer",
                zIndex: 8
            });
            _self.map.addLayer(xianLayer);

            //河道图层
            let waterLayer = new ImageLayer({
                extent: [114.7750819, 36.04839378, 115.08771349057238, 36.43952904],
                source: new ImageWMS({
                    url: mapServer + "/geoserver/weixian/wms",
                    params: {
                        LAYERS: "weixian:魏县_河流"
                    },
                    ratio: 1,
                    serverType: "geoserver"
                }),
                id: "waterLayer",
                zIndex: 9
            });
            _self.map.addLayer(waterLayer);
            //河道乡镇图层
            let waterTownLayer = new ImageLayer({
                extent: [114.7750819, 36.04839378, 115.08771349057238, 36.43952904],
                source: new ImageWMS({
                    url: mapServer + "/geoserver/weixian/wms",
                    params: {
                        LAYERS: "weixian:魏县_河流乡镇"
                    },
                    ratio: 1,
                    serverType: "geoserver"
                }),
                id: "waterTownLayer",
                zIndex: 9
            });
            _self.map.addLayer(waterTownLayer);
        },
        /**
         * 添加专题数据
         * @param {图层名称} name
         * @param {状态} state
         */
        addFeatureData(name, state) {
            let _self = this;
            if (name && state) {
                switch (name) {
                    case "监控":
                    case "无人机":
                    case "水文站":
                    case "水质站":
                    case "雨量站":
                    case "闸泵":
                    case "告警":
                    case "积水点":
                        this.$api.mapApi.addGeoJson(name).then((res) => {
                            let vectorSource = new VectorSource({
                                features: new GeoJSON().readFeatures(res)
                            });
                            let tempLayer = new VectorLayer({
                                source: vectorSource,
                                style: _self.styleFunction,
                                id: name,
                                zIndex: 10
                            });
                            _self.map.addLayer(tempLayer);
                        });

                        break;

                    default:
                        break;
                }
            } else {
                let layers = _self.map.getLayers().array_;
                for (let i = 0; i < layers.length; i++) {
                    if (layers[i].values_.id == name) {
                        _self.map.removeLayer(layers[i]);
                        break;
                    }
                }
            }
        },
        /**
         * 初始化样式
         */
        initStyle() {
            let _self = this;
            let image = new Circle({
                radius: 5,
                fill: null,
                stroke: new Stroke({ color: "red", width: 1 })
            });
            let scale = 0.15;
            _self.styles = {
                Point水文站: new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: HydroIcon,
                        scale: scale
                    })
                }),
                Point水质站: new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: WaterIcon,
                        scale: scale
                    })
                }),
                Point无人机: new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: DroneIcon,
                        scale: scale
                    })
                }),
                Point雨量站: new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: RainIcon,
                        scale: scale
                    })
                }),
                Point监控: new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: CCTVIcon,
                        scale: scale
                    })
                }),
                Point告警: new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: AlertIcon,
                        scale: scale
                    })
                }),
                Point闸泵: new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: GateIcon,
                        scale: scale
                    })
                }),
                Point积水点: new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: PondingIcon,
                        scale: scale
                    })
                }),
                LineString: new Style({
                    stroke: new Stroke({
                        color: "green",
                        width: 1
                    })
                }),
                MultiLineString: new Style({
                    stroke: new Stroke({
                        color: "green",
                        width: 1
                    })
                }),
                MultiPoint: new Style({
                    image: image
                }),
                MultiPolygon: new Style({
                    stroke: new Stroke({
                        color: "yellow",
                        width: 1
                    }),
                    fill: new Fill({
                        color: "rgba(255, 255, 0, 0.1)"
                    })
                }),
                Polygon: new Style({
                    stroke: new Stroke({
                        color: "blue",
                        lineDash: [4],
                        width: 3
                    }),
                    fill: new Fill({
                        color: "rgba(0, 0, 255, 0.1)"
                    })
                }),
                GeometryCollection: new Style({
                    stroke: new Stroke({
                        color: "magenta",
                        width: 2
                    }),
                    fill: new Fill({
                        color: "magenta"
                    }),
                    image: new Circle({
                        radius: 10,
                        fill: null,
                        stroke: new Stroke({
                            color: "magenta"
                        })
                    })
                }),
                Circle: new Style({
                    stroke: new Stroke({
                        color: "red",
                        width: 2
                    }),
                    fill: new Fill({
                        color: "rgba(255,0,0,0.2)"
                    })
                })
            };
        },
        /**
         * 获取样式
         * @param {要素} feature
         */
        styleFunction(feature) {
            let _self = this;
            return _self.styles[feature.getGeometry().getType() + feature.getProperties().type];
        },
        /**
         * 鼠标位置
         */
        mousePosition() {
            let _self = this;
            var mapDiv = document.getElementById("mapBox");
            var div = document.createElement("div");
            div.className = "custom-mouse-position";
            div.id = "mouse-position";
            mapDiv.appendChild(div);
            _self.map.on("pointermove", function (evt) {
                var latlon = toStringHDMS(evt.coordinate).split(" ");
                var lat = latlon[0] + " " + latlon[1] + " " + latlon[2] + " " + latlon[3] + " ";
                var lon = latlon[4] + " " + latlon[5] + " " + latlon[6] + " " + latlon[7] + " ";
                document.getElementById("mouse-position").innerHTML = lon + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + lat;
            });
        },
        /**
         * 初始化测量图层
         */
        initMeasure(state) {
            let _self = this;
            if (state) {
                _self.measuerSource = new VectorSource();
                //定义矢量图层
                _self.measureLayer = new VectorLayer({
                    source: _self.measuerSource,
                    style: new Style({
                        fill: new Fill({
                            color: "rgba(255,255,255,0.2)"
                        }),
                        stroke: new Stroke({
                            color: "rgba(251, 127, 32, 1)",
                            width: 2
                        }),
                        image: new Circle({
                            radius: 5,
                            fill: new Fill({
                                color: "#ffcc33"
                            })
                        })
                    }),
                    zIndex: 50
                });
                //将矢量图层添加到地图中
                _self.map.addLayer(_self.measureLayer);

                _self.sketch; //最近画的要素
                _self.helpTooltipElement; //帮助工具提示元素
                _self.helpTooltip; //overlay显示帮助信息
                _self.measureTooltipElement; //测量帮助工具提示元素
                _self.measureTooltip; //overlay显示测量结果

                this.createMeasureTooltip();
                this.createHelpTooltip();

                const pointerMoveHandler = function (evt) {
                    if (evt.dragging) {
                        return;
                    }
                    let helpMsg = "单击以开始测量";

                    if (_self.sketch) {
                        const geom = _self.sketch.getGeometry();
                        if (geom instanceof Polygon) {
                            helpMsg = "单击以继续绘制多边形";
                        } else if (geom instanceof LineString) {
                            helpMsg = "单击以继续绘制直线";
                        }
                    }

                    _self.helpTooltipElement.innerHTML = helpMsg;
                    _self.helpTooltip.setPosition(evt.coordinate);

                    _self.helpTooltipElement.classList.remove("hidden");
                };
                _self.map.on("pointermove", pointerMoveHandler);
                _self.map.getViewport().addEventListener("mouseout", function () {
                    _self.helpTooltipElement.classList.add("hidden");
                });
            } else {
                _self.map.removeLayer(_self.measureLayer);
                _self.map.removeInteraction(_self.draw);
                var tooltips = document.querySelectorAll(".ol-tooltip");
                for (let i = 0; i < tooltips.length; i++) {
                    if (tooltips[i]) tooltips[i].remove();
                }
                _self.helpTooltipElement = null;
                _self.measureTooltipElement = null;
            }
        },
        /**
         * 测距测面
         * @param {测距/测面 -> "Polygon" / "LineString"} type
         */
        addInteraction(type) {
            let _self = this;

            _self.draw = new Draw({
                source: _self.measuerSource,
                type: type,
                style: new Style({
                    fill: new Fill({
                        color: "rgba(255, 255, 255, 0.1)"
                    }),
                    stroke: new Stroke({
                        color: "rgba(251, 127, 32, 1)",
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new Circle({
                        radius: 5,
                        stroke: new Stroke({
                            color: "rgba(251, 127, 32, 0.9)"
                        }),
                        fill: new Fill({
                            color: "rgba(251, 127, 32, 0.2)"
                        })
                    })
                })
            });
            _self.map.addInteraction(_self.draw);

            let listener;
            _self.draw.on("drawstart", function (evt) {
                _self.sketch = evt.feature;

                let tooltipCoord = evt.coordinate;

                listener = _self.sketch.getGeometry().on("change", function (evt) {
                    const geom = evt.target;
                    let output;
                    if (geom instanceof Polygon) {
                        output = _self.formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof LineString) {
                        output = _self.formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    _self.measureTooltipElement.innerHTML = output;
                    _self.measureTooltip.setPosition(tooltipCoord);
                });
            });

            _self.draw.on("drawend", function () {
                _self.measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
                _self.measureTooltip.setOffset([0, -7]);
                // unset sketch
                _self.sketch = null;
                // unset tooltip so that a new one can be created
                _self.measureTooltipElement = null;
                _self.createMeasureTooltip();
                unByKey(listener);
            });
        },
        /**
         * 计算距离
         * @param {*} line
         */
        formatLength(line) {
            let _self = this;
            let proj = _self.map.getView().getProjection();
            const length = getLength(line, { projection: proj, radius: 6378137 });
            let output;
            if (length > 100) {
                output = Math.round((length / 1000) * 100) / 100 + " " + "km";
            } else {
                output = Math.round(length * 100) / 100 + " " + "m";
            }
            return output;
        },
        /**
         * 计算面积
         * @param {*} polygon
         */
        formatArea(polygon) {
            let _self = this;
            let proj = _self.map.getView().getProjection();
            const area = getArea(polygon, { projection: proj, radius: 6378137 });
            let output;
            if (area > 10000) {
                output = Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
            } else {
                output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
            }
            return output;
        },
        /**
         * 创建新的帮助工具提示
         */
        createHelpTooltip() {
            let _self = this;
            if (_self.helpTooltipElement) {
                _self.helpTooltipElement.parentNode.removeChild(_self.helpTooltipElement);
            }
            _self.helpTooltipElement = document.createElement("div");
            _self.helpTooltipElement.className = "ol-tooltip hidden";
            _self.helpTooltip = new Overlay({
                element: _self.helpTooltipElement,
                offset: [15, 0],
                positioning: "center-left"
            });
            _self.map.addOverlay(_self.helpTooltip);
        },

        /**
         * 创建新的度量值工具提示
         */
        createMeasureTooltip() {
            let _self = this;
            if (_self.measureTooltipElement) {
                _self.measureTooltipElement.parentNode.removeChild(_self.measureTooltipElement);
            }
            _self.measureTooltipElement = document.createElement("div");
            _self.measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
            _self.measureTooltip = new Overlay({
                element: _self.measureTooltipElement,
                offset: [0, -15],
                positioning: "bottom-center",
                stopEvent: false,
                insertFirst: false
            });
            _self.map.addOverlay(_self.measureTooltip);
        }
    }
};
</script>

<style lang="scss" scoped>
.box-map {
    width: 100%;
    height: 100%;
}
::v-deep {
    .ol-tooltip {
        font-size: 14px;
        font-weight: bold;
        text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
            0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff;
        &.ol-tooltip-static {
            color: rgb(0, 0, 0);
            font-weight: bold;
            text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
                0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff;
        }
        &.hidden {
            color: transparent;
        }
        &.ol-tooltip-measure {
            color: rgb(0, 0, 0);
            font-weight: bold;
            text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
                0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff;
        }
    }

    .custom-mouse-position {
        position: absolute;
        height: 22px;
        line-height: 22px;
        width: 300px;
        left: 42%;
        bottom: 10px;
        color: white;
        font-size: 14px;
        font-family: "微软雅黑";
        padding: 2px;
        text-align: center;
        background-color: rgba(7, 37, 126, 0.7);
    }
}
</style>
