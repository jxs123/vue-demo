<!--
 * @Description: 注册页面
 * @Date: 2022-08-02 14:43:31
-->
<template>
    <div class="login-content flex">
        <div class="login-left flex-1">
            <div class="login-tit">{{ systemTitle }}</div>
        </div>
        <div class="login-right flex-column space-around align-center">
            <div class="login-con">
                <el-form ref="winRefs" :model="winForm" :rules="winRules" label-width="0px">
                    <div class="title">账号注册</div>
                    <div class="list list-1">
                        <el-form-item prop="username">
                            <el-input v-model="winForm.username" prefix-icon="iconfont iconnicheng" placeholder="用户名" autocomplete="off"> </el-input>
                        </el-form-item>
                    </div>
                    <div class="list">
                        <el-form-item prop="nickname">
                            <el-input v-model="winForm.nickname" prefix-icon="iconfont iconxingming" placeholder="人员姓名" autocomplete="off"> </el-input>
                        </el-form-item>
                    </div>
                    <div class="list">
                        <el-form-item prop="mobile">
                            <el-input v-model="winForm.mobile" prefix-icon="iconfont iconphone2" placeholder="手机号" autocomplete="off"> </el-input>
                        </el-form-item>
                    </div>
                    <div class="list">
                        <el-form-item prop="password">
                            <el-input type="password" v-model="winForm.password" show-password prefix-icon="iconfont iconmima" placeholder="密码" autocomplete="new-password"> </el-input>
                        </el-form-item>
                    </div>
                    <div class="list">
                        <el-form-item prop="roleId">
                            <el-select v-model="winForm.roleId" placeholder="用户角色" @change="roleChange">
                                <template slot="prefix">
                                    <i class="iconfont iconjiaose"></i>
                                </template>
                                <el-option v-for="(item, index) in roleListData" :key="'js' + index" :label="item.name" :value="item.id"> </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <template v-if="winForm.roleCode === 'cjdw' || winForm.roleCode === 'jldw'">
                        <div class="list">
                            <el-form-item prop="projectId">
                                <el-select v-model="winForm.projectId" placeholder="国家项目" @change="projectChange">
                                    <template slot="prefix">
                                        <i class="iconfont icongjxm"></i>
                                    </template>
                                    <el-option v-for="(item, index) in projectList" :key="'gj' + index" :label="item.projectName" :value="item.id"> </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="list">
                            <el-form-item prop="sectionName">
                                <el-select v-model="winForm.sectionName" placeholder="所属标段">
                                    <template slot="prefix">
                                        <i class="iconfont iconbiaoduan1"></i>
                                    </template>
                                    <el-option v-for="(item, index) in sectionList" :key="'bd' + index" :label="item" :value="item"> </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </template>
                    <template v-else-if="winForm.roleCode === 'xznynczx' || winForm.roleCode === 'cjyh'">
                        <div class="list">
                            <el-form-item prop="townCode">
                                <el-select v-model="winForm.townCode" placeholder="乡镇/街道" @change="townChange">
                                    <template slot="prefix">
                                        <i class="iconfont iconzhen"></i>
                                    </template>
                                    <el-option v-for="(item, index) in zhenList" :key="'xz' + index" :label="item.name" :value="item.code"> </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </template>
                    <template v-if="winForm.roleCode === 'cjyh'">
                        <div class="list">
                            <el-form-item prop="villageCode">
                                <el-select v-model="winForm.villageCode" placeholder="村">
                                    <template slot="prefix">
                                        <i class="iconfont iconcun"></i>
                                    </template>
                                    <el-option v-for="(item, index) in cunList" :key="'cz' + index" :label="item.name" :value="item.code"> </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </template>
                    <div class="list">
                        <el-form-item prop="orgCode">
                            <el-select v-model="winForm.orgCode" filterable popper-class="add-tree-select" placeholder="单位名称">
                                <template slot="prefix">
                                    <i class="iconfont iconqiye"></i>
                                </template>
                                <el-tree
                                    v-if="orgList.length > 0"
                                    :data="orgList"
                                    :render-content="treeRightContent"
                                    node-key="id"
                                    :expand-on-click-node="false"
                                    default-expand-all
                                    class="add-chart-tree"
                                >
                                </el-tree>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="list">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item prop="idCode">
                                    <el-input v-model="winForm.idCode" prefix-icon="iconfont iconyanzheng" placeholder="验证码" autocomplete="off"> </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="14">
                                <Identify :identifyCode="identifyCode"></Identify>
                                <el-button type="text" class="code-refresh" @click="refreshIdCode">
                                    <i class="iconfont iconshuaxin"></i>
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="login-btn">
                        <el-button type="primary" :loading="loading" @click.native.prevent="register()">注 册</el-button>
                    </div>
                    <div class="login-msg">已有账号？<span @click="toLogin">立即登录</span></div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import md5 from "js-md5";
import { usernamePass, fullNamePass, passwordPass, telPass } from "@/utils/rules/rules";
import { mapGetters } from "vuex";
import Identify from "./identify.vue";
export default {
    components: { Identify },
    data() {
        const idCodePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入验证码"));
            } else if (value !== this.identifyCode) {
                callback(new Error("验证码错误"));
            } else {
                callback();
            }
        };
        return {
            systemTitle: "农田建设管理信息化平台",
            loading: false,
            savePwd: false,
            orgList: [],
            roleListData: [],
            zhenList: [],
            cunList: [],
            projectList: [],
            sectionList: [],
            identifyCode: "",
            identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz",
            winForm: {
                username: "",
                orgCode: "", // 单位名称
                roleId: "", // 角色ID
                roleCode: "", // 角色标识
                nickname: "", // 姓名（昵称）
                password: "", // 密码
                mobile: "", // 手机号
                checkStatus: "未审核",
                status: "1",
                idCode: "", // 验证码
                townCode: "", // 镇
                villageCode: "", // 村
                projectId: "", // 国家项目
                sectionName: "" // 所属标段
            },
            winRules: {
                orgCode: [{ required: true, message: "请选择", trigger: "blur" }],
                roleId: [{ required: true, message: "请选择", trigger: "blur" }],
                nickname: [
                    { required: true, message: "请输入", trigger: "blur" },
                    { trigger: ["change", "blur"], validator: fullNamePass }
                ],
                username: [
                    { required: true, message: "请输入", trigger: "blur" },
                    { trigger: ["change", "blur"], validator: usernamePass }
                ],
                password: [
                    { required: true, message: "请输入", trigger: "blur" },
                    { trigger: ["change", "blur"], validator: passwordPass }
                ],
                mobile: [
                    { required: true, message: "请输入", trigger: "blur" },
                    { validator: telPass, trigger: ["change", "blur"] }
                ],
                idCode: [
                    { required: true, message: "请输入", trigger: "blur" },
                    { trigger: "blur", validator: idCodePass }
                ],
                townCode: [{ required: true, message: "请选择", trigger: "blur" }],
                villageCode: [{ required: true, message: "请选择", trigger: "blur" }],
                projectId: [{ required: true, message: "请选择", trigger: "blur" }],
                sectionName: [{ required: true, message: "请选择", trigger: "blur" }]
            }
        };
    },
    computed: {
        ...mapGetters(["settingInfo"])
    },
    created() {
        const settingInfo = this.settingInfo;
        this.systemTitle = settingInfo.systemTitle;

        this.getMenuData();
        this.loadTreeData();
    },
    mounted() {
        var that = this;
        // 初始化验证码
        this.identifyCode = "";
        this.makeCode(4);

        document.getElementsByClassName("login-content")[0].onkeyup = function (e) {
            var key = window.event.keyCode;
            if (key == 13) {
                that.register();
            }
        };
    },
    methods: {
        /* 获取角色列表 */
        getMenuData() {
            let that = this;
            this.$store.dispatch("system/roleInfo3").then((res) => {
                that.roleListData = res;
            });
        },
        /* 获取组织部门 */
        loadTreeData() {
            if (this.orgList.length === 0) {
                this.$api.systemDepartApi
                    .getAllOrg()
                    .then((res) => {
                        if (res.success) {
                            let resData = res.result;
                            this.orgList = resData;
                        } else {
                            this.orgList = [];
                        }
                    })
                    .catch((err) => {
                        this.treeData = [];
                    });
            }
        },
        /* 获取国家项目 */
        loadProject() {
            this.$api.jsProjectApi
                .getProjectList()
                .then((res) => {
                    if (res.success) {
                        let resData = res.result;
                        let arr = [];
                        resData.forEach((item) => {
                            arr.push({
                                id: item.id,
                                projectName: item.projectName,
                                sectionNames: item.sectionNames ? item.sectionNames : []
                            });
                        });
                        this.projectList = arr;
                    } else {
                        this.projectList = [];
                    }
                })
                .catch((err) => {
                    this.projectList = [];
                });
        },
        /* 加载区域 */
        getCityData(code, level) {
            let params = { code: code, level: level };
            this.$store.dispatch("system/ssqInfo", params).then((res) => {
                if (level === "4") {
                    this.zhenList = res;
                } else {
                    this.cunList = res;
                }
            });
        },
        /* 返回树标签 */
        treeRightContent(h, { node, data, store }) {
            let nodeData = node.data;
            let icon = "";
            if (nodeData.id === "0") {
                icon = "iconzhankai";
            } else if (nodeData.pid === "0") {
                icon = "icongongsi00";
            } else {
                icon = "iconrenyuanxinxi";
            }
            return (
                <span class="custom-tree-node">
                    <el-option label={nodeData.departName} value={nodeData.id}>
                        <i class={["iconfont", icon]}></i>
                        {nodeData.departName}
                    </el-option>
                </span>
            );
        },
        /* 角色选择 */
        roleChange(val) {
            let roleObj = this.roleListData.find((item) => item.id === val);
            if (roleObj) {
                this.$set(this.winForm, "roleCode", roleObj.role);
                // 根据权限加载下拉菜单数据
                if (roleObj.role === "cjdw" || roleObj.role === "jldw") {
                    this.loadProject();
                } else {
                    const settingInfo = this.settingInfo;
                    this.getCityData(settingInfo.countyCode, "4");
                }
            } else {
                this.$set(this.winForm, "roleCode", "");
            }
        },
        /* 国家项目切换 */
        projectChange(val) {
            // 加载标段
            this.$set(this.winForm, "sectionName", "");
            let xmObj = this.projectList.find((item) => item.id === val);
            if (xmObj) {
                this.sectionList = xmObj.sectionNames;
            } else {
                this.sectionList = [];
            }
        },
        /* 镇切换 */
        townChange(val) {
            this.$set(this.winForm, "villageCode", "");
            // 加载村
            if (this.winForm.roleCode === "cjyh") {
                this.getCityData(val, "5");
            }
        },
        /* 注册 */
        register() {
            this.$refs.winRefs.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    // 调用注册接口
                    let { username, orgCode, roleId, nickname, password, mobile, townCode, villageCode, projectId, sectionName, roleCode } = this.winForm;
                    const settingInfo = this.settingInfo;

                    let saveObj = {
                        checkStatus: "未审核",
                        email: "",
                        mobile: mobile, // 手机号
                        username: username, // 账号
                        nickname: nickname, // 姓名（昵称）
                        orgCode: orgCode,
                        password: md5(password), // 密码
                        regionCode: settingInfo.countyCode,
                        roleIdList: [roleId], // 角色ID
                        status: "1",
                        townCode: townCode,
                        villageCode: villageCode
                    };
                    if (roleCode === "cjdw" || roleCode === "jldw") {
                        saveObj["sectionList"] = [{ projectId: projectId, sectionName: sectionName }];
                    }
                    this.$api.userApi
                        .registerUser(saveObj)
                        .then((res) => {
                            if (res.success) {
                                this.$alert("注册成功！审核通过后才能登录", "提示", {
                                    confirmButtonText: "确定",
                                    type: "success",
                                    center: true,
                                    callback: (action) => {
                                        this.$router.push("/login");
                                    }
                                });
                            } else {
                                this.loading = false;
                                this.$message.error(res.error);
                            }
                        })
                        .catch((err) => {
                            this.loading = false;
                        });
                }
            });
        },
        /* 登录 */
        toLogin() {
            this.$router.push("/login");
        },
        /* 生成二维码 */
        makeCode(l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
            }
        },
        /* 随机数 = Math.floor(Math.random() * 可能的总数 + 第一个可能的值) */
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        /* 刷新二维码 */
        refreshIdCode() {
            this.identifyCode = "";
            this.makeCode(4);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
.login-content .login-con .list {
    padding-top: 10px;
    &.list-1 {
        padding-top: 50px;
    }
}
.code-refresh {
    vertical-align: top;
    margin-left: 12px;
    i {
        font-size: 18px;
    }
}
</style>
