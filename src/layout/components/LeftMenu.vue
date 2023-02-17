<!--
 * @Description: 左侧菜单
 * @Author: jinxiaoshan
 * @Date: 2022-06-20 17:37:33
-->
<template>
    <el-menu class="left-menu" background-color="transparent" text-color="#575757" router :default-active="activePath" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false">
        <!-- 一级菜单 -->
        <el-menu-item v-for="item in menuList" :key="item.id" :index="`/${systemPath}/${homePath}/${item.code}`">
            <i :class="['iconfont', item.icon]" :style="{ color: item.color ? item.color : '#1b70d2' }"></i>
            <span slot="title">{{ item.name }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["navList"])
    },
    props: {
        navCode: {
            type: String,
            default: "nav"
        },
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            menuList: [],
            systemPath: "",
            homePath: "",
            activePath: ""
        };
    },
    created() {
        let nav = this.navList;
        let navData = nav[0].children;
        let menuData = navData.filter((item) => item.code === this.navCode);
        let menu = [];
        if (menuData.length > 0) {
            menu = menuData[0].children;
            let systemPath = nav[0].code;
            this.systemPath = systemPath;
            let homePath = menuData[0].code;
            this.homePath = homePath;
            let page = menu[0].code;
            this.menuList = menu;
            let defaults = "/" + systemPath + "/" + homePath + "/" + page;
            this.activePath = window.sessionStorage.getItem("activePath") || defaults;
        }
    },
    methods: {
        handleSelect(item) {
            if (this.activePath !== item) {
                this.activePath = item;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.left-menu {
    border-right: 0;
    &.el-menu--collapse {
        width: 100%;
    }
}
.el-menu-item {
    height: 48px;
    line-height: 48px;
    margin: 5px 0;
    padding: 0 0 0 38px !important;
    font-size: 14px;
    ::v-deep .el-tooltip {
        text-align: center;
    }
    i.iconfont {
        margin-right: 8px;
        color: #6b6f74;
        font-size: 18px;
        vertical-align: top;
    }
    & > span {
        vertical-align: top;
        color: #6b6f74;
    }
    &.is-active,
    &:hover {
        // color: var(--el-color-primary) !important;
        background-color: #f3faff !important;
        i.iconfont {
            font-weight: normal;
        }
    }
}
</style>
