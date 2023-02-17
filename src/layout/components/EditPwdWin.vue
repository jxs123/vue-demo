<!--
 * @Description: 修改密码
 * @Author: jinxiaoshan
 * @Date: 2022-03-22 09:13:21
-->
<template>
    <el-dialog title="修改密码" :visible.sync="visible" width="540px" :before-close="handleClose" custom-class="custom-dialog" :append-to-body="true" :close-on-click-modal="false">
        <div class="add-data">
            <!-- 基本信息 -->
            <div class="form-content">
                <el-form ref="winRefs" :model="winForm" :rules="winRules" label-width="120px">
                    <el-form-item label="密码" prop="passwordOld">
                        <el-input type="password" v-model="winForm.passwordOld" autocomplete="new-password"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="winForm.password" autocomplete="new-password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="winForm.password2" autocomplete="new-password"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" :loading="saveLoading" @click="handleSave">保存</el-button>
        </span>
    </el-dialog>
</template>

<script>
import md5 from "js-md5";
import { passwordPass } from "@/utils/rules/rules";
export default {
    data() {
        var checkPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.winForm.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            visible: false,
            saveLoading: false,
            // 基本信息
            winForm: {
                username: "",
                passwordOld: "",
                password: "",
                password2: ""
            },
            winRules: {
                passwordOld: [{ required: true, message: "请输入", trigger: "blur" }],
                password: [
                    { required: true, message: "请输入", trigger: "blur" },
                    { trigger: "blur", validator: passwordPass }
                ],
                password2: [
                    { required: true, message: "请输入", trigger: "blur" },
                    { trigger: "blur", validator: checkPass }
                ]
            }
        };
    },
    created() {},
    mounted() {},
    methods: {
        /* 打开弹窗 */
        openWin(username) {
            // 修改
            let winObj = {
                username: username,
                passwordOld: "",
                password: "",
                password2: ""
            };
            this.winForm = winObj;
            this.visible = true;
        },
        /* 关闭弹窗 */
        handleClose() {
            this.$refs.winRefs.resetFields();
            this.visible = false;
        },
        /* 确定保存 */
        handleSave() {
            this.$refs.winRefs.validate((valid) => {
                if (valid) {
                    this.saveLoading = true;
                    let { username, password, passwordOld } = this.winForm;
                    let saveObj = {
                        passwordOld: md5(passwordOld),
                        username: username,
                        passwordNew: md5(password)
                    };
                    this.$api.userApi
                        .editPwd(saveObj)
                        .then((res) => {
                            this.saveLoading = false;
                            if (res.success) {
                                this.visible = false;
                                this.$alert("密码修改成功，请重新登录！", "提示", {
                                    confirmButtonText: "确定",
                                    type: "success",
                                    center: true,
                                    callback: (action) => {
                                        this.$router.replace("/login");
                                    }
                                });
                            } else {
                                this.$message.error(res.error);
                            }
                        })
                        .catch((err) => {
                            this.saveLoading = false;
                        });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.add-data {
    @include scrollBar;
    height: 300px;
    overflow-y: auto;
    padding: 20px 40px 20px 0;

    .form-content {
        padding: 0 42px;
    }
}
</style>
