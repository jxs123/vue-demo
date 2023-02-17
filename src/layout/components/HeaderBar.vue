<!--
 * @Description: 导航栏
 * @Author: jinxiaoshan
 * @Date: 2022-06-13 16:44:31
-->
<template>
    <div class="record-HeaderBar">
        <div class="title">魏县全网水域可视化平台</div>
        <div class="center-nav">
            <header-menu />
        </div>
        <div class="right-flex">&nbsp;</div>
        <div class="right-box">
            <el-dropdown @command="exportCommand">
                <span class="el-dropdown-link">
                    <i class="iconfont icongeren"></i>
                    <span>{{ userName }}</span>
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="header-dropdown">
                    <el-dropdown-item command="edit">修改密码</el-dropdown-item>
                    <el-dropdown-item command="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <EditPwdWin ref="editWinRefs"></EditPwdWin>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
// 导航组件
import HeaderMenu from "./Menu";
import EditPwdWin from "./EditPwdWin";
export default {
    name: "HeaderBar",
    components: {
        HeaderMenu,
        EditPwdWin
    },
    data() {
        return {
            userName: ""
        };
    },
    computed: {
        ...mapGetters(["userInfo"])
    },
    created() {
        const userInfo = this.userInfo;
        this.userName = userInfo.nickname ? userInfo.nickname : userInfo.username;
    },
    mounted() {},
    methods: {
        exportCommand(command) {
            if (command === "exit") {
                this.$router.replace("/login");
            } else if (command === "edit") {
                const userInfo = this.userInfo;
                this.$refs.editWinRefs.openWin(userInfo.username);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.record-HeaderBar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 70px;
    background: var(--el-color-primary);
    background-size: 100% 100%;

    .title {
        height: 50px;
        line-height: 40px;
        padding-left: calc(50vw - 5.5em);
        font-size: 32px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
        letter-spacing: 1px;
        text-shadow: 0px 2px 0px var(--us-color-titlebg);
    }

    .center-nav {
        position: absolute;
        left: 0;
        right: 0;
        z-index: 9;
    }
    .right-flex {
        flex: 1;
    }
    .right-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 40px;
        padding-top: 8px;
        z-index: 10;
        .el-dropdown-link {
            color: #fff;
            .iconfont {
                margin-right: 8px;
                font-size: 28px;
            }
            span,
            i {
                vertical-align: middle;
            }
            span {
                margin-right: 4px;
            }
            i.iconphone {
                font-size: 20px;
            }
        }
        .news-btn,
        .help-btn {
            margin-right: 20px;
            width: 40px;
            cursor: pointer;
            i.iconfont {
                font-size: 30px;
                color: #fff;
            }
        }

        .link-spline {
            position: relative;
            display: inline-block;
            height: 16px;
            padding: 0 16px;
            &:before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 50%;
                width: 1px;
                background-color: rgba(255, 255, 255, 0.4);
            }
        }
        .link-btn {
            color: #fff;
        }
    }
}
</style>
