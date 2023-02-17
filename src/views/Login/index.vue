<template>
    <div class="login-content flex align-center">
        <div class="login-con">
            <div class="login-left flex-1">
                <div class="login-tit1">{{ systemTitle }}</div>
                <div class="login-tit2">WATERS&nbsp;VISUALIZATION</div>
            </div>
            <div class="login-right space-around flex-column align-center">
                <div class="login-form">
                    <el-form ref="winRefs" :model="winForm" :rules="winRules" label-width="0px">
                        <div class="title">欢迎登录</div>
                        <div class="list">
                            <el-form-item prop="username">
                                <el-input v-model="winForm.username" prefix-icon="iconfont iconyonghuming" placeholder="用户名/手机号" autocomplete="off"> </el-input>
                            </el-form-item>
                        </div>
                        <div class="list">
                            <el-form-item prop="password">
                                <el-input type="password" v-model="winForm.password" show-password prefix-icon="iconfont iconmima" placeholder="密码" autocomplete="new-password"> </el-input>
                            </el-form-item>
                        </div>
                        <div class="login-check">
                            <el-checkbox v-model="savePwd">记住密码</el-checkbox>
                            <span class="forget-btn" @click="toRegister">注册账号</span>
                        </div>
                        <br />
                        <div class="login-btn">
                            <el-button type="primary" :loading="loading" @click.native.prevent="login()">登&nbsp;&nbsp;录</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import md5 from "js-md5";
const Base64 = require("js-base64").Base64;
// import { initRoutes, resetRouter } from "@/router/index.js"; // 按需引入路由的动态注入方法
export default {
    data() {
        return {
            systemTitle: "魏县全网水域可视化平台",
            loading: false,
            savePwd: false,
            winForm: {
                username: "",
                password: ""
            },
            winRules: {
                username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            }
        };
    },
    async created() {
        // 重置用户信息
        await this.$store.dispatch("user/resetInfo");
        // 获取记住密码状态
        let savePwd = this.$cookies.get("savePwd") + "";
        // 是记住密码，获取密码
        if (savePwd == "true") {
            let isTf = this.$cookies.isKey("userInfo");
            if (isTf) {
                let userInfo = this.$cookies.get("userInfo");
                this.winForm.username = userInfo.username;
                this.winForm.password = Base64.decode(userInfo.password);
                this.savePwd = true;
            }
        }
    },
    mounted() {
        var that = this;
        document.getElementsByClassName("login-content")[0].onkeyup = function (e) {
            var key = window.event.keyCode;
            if (key == 13) {
                that.login();
            }
        };
    },
    methods: {
        login() {
            this.$refs.winRefs.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    // 调用登录接口
                    this.$store
                        .dispatch("user/login", {
                            username: this.winForm.username,
                            password: this.winForm.password
                        })
                        .then((res) => {
                            this.loading = false;
                            // 记住密码
                            let savePwd = this.savePwd + "";
                            this.$cookies.set("savePwd", savePwd, "1m");
                            if (savePwd == "true") {
                                this.$cookies.set(
                                    "userInfo",
                                    {
                                        username: this.winForm.username,
                                        password: Base64.encode(this.winForm.password)
                                    },
                                    "1m"
                                );
                            } else {
                                this.$cookies.remove("userInfo");
                            }
                            this.$router.push({
                                path: res
                            });
                        })
                        .catch((err) => {
                            this.loading = false;
                            this.$message.error(err);
                        });
                }
            });
        },
        // 忘记密码
        forgetPwd() {
            this.$notify.closeAll();
            this.$notify({
                title: "提示",
                message: "请联系管理员重置密码",
                type: "warning",
                offset: 20,
                showClose: false
            });
        },
        /* 注册 */
        toRegister() {
            this.$router.push("/register");
        }
    },
    watch: {
        $route(to, from) {
            // 路由发生变化页面刷新
        }
    }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
