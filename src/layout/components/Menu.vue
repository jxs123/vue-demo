<!--
 * @Description: 菜单
 * @Author: jinxiaoshan
 * @Date: 2022-03-01 16:06:52
-->
<template>
    <div class="header-menu">
        <el-menu
            :default-active="activePath"
            class="el-menu-demo"
            mode="horizontal"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#fff"
            @select="handleSelect"
            :style="{ 'padding-left': menuList.length === 5 ? '0' : '' }"
        >
            <template v-for="(item, idx) in menuList">
                <el-submenu
                    v-if="filterMenu(item)"
                    :index="`/qwsy/${item.code}`"
                    :key="item.id"
                    popper-class="header-menu-pop"
                    :style="{ 'margin-left': menuList.length === 5 && idx === 3 ? '700px' : '0px' }"
                >
                    <template slot="title">
                        <div :class="['menu-nav', { 'is-active': activeLeft === idx }]">
                            <span class="icon-box" v-if="item.icon">
                                <i :class="['iconfont', item.icon]"></i>
                            </span>
                            <span :class="['text-box']" slot="title">{{ item.name }}</span>
                        </div>
                    </template>
                    <el-menu-item v-for="items in item.children" :key="items.id" :index="`/qwsy/${item.code}/${items.code}`">
                        {{ items.name }}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="`/qwsy/${item.code}`" :key="item.id" :style="{ 'margin-left': menuList.length === 5 && idx === 3 ? '700px' : '0px' }">
                    <span class="icon-box" v-if="item.icon">
                        <i :class="['iconfont', item.icon]"></i>
                    </span>
                    <span :class="['text-box', { 'is-active': activeLeft === idx }]" slot="title">{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "HeaderMenu",
    data() {
        return {
            activeLeft: -1,
            activePath: "/qwsy/home",
            menuList: [],
            leftMenu: ["water", "event", "system"]
        };
    },
    watch: {
        /* 动态路由，路由切换created不会成复执行 */
        $route(to, from) {
            // 监听路由的变化，做你想做的一些事情...
            let path = window.sessionStorage.getItem("activePath");
            this.activePath = path;
            this.setActiveIdx();
        }
    },
    computed: {
        ...mapGetters(["navList"])
    },
    created() {
        const menu = this.navList[0].children;
        let defaults = "/qwsy/" + menu[0].code;
        this.activePath = window.sessionStorage.getItem("activePath") || defaults;
        this.menuList = menu;
        this.setActiveIdx();
    },
    methods: {
        filterMenu(item) {
            let len = item.children && item.children.length > 0;
            let ty = true;
            if (len) {
                ty = item.children[0].type === "ST";
            }
            let menu = this.leftMenu;
            let isMenu = menu.indexOf(item.code);
            return len && ty && isMenu === -1;
        },
        /* 菜单切换 */
        handleSelect(key, keyPath) {
            if (this.activePath !== key) {
                this.activePath = key;
                this.$router.push(key);
            }
        },
        // 设置加载左侧菜单的选中状态
        setActiveIdx() {
            let menu = this.menuList;
            if (menu.length > 0) {
                let leftMenu = this.leftMenu;
                let activeIdx = -1;
                menu.forEach((item, idx) => {
                    let isMenu = leftMenu.indexOf(item.code);
                    if (isMenu !== -1 || item.code === "special") {
                        let menuPath = "/qwsy/" + item.code;
                        if (this.activePath.indexOf(menuPath) !== -1) {
                            activeIdx = idx;
                        }
                    }
                });
                this.activeLeft = activeIdx;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.header-menu {
    padding: 0 40px;
    .el-menu-demo {
        display: flex;
        padding: 0 calc((100% - 700px) / 6);
        // & > li:nth-child(3) {
        //     margin-left: 700px;
        // }
        .el-menu-item {
            flex: 1;
        }
    }
    .el-menu-item,
    .el-submenu {
        font-size: 16px;
        margin: 0 8px;
        text-align: center;
    }
    .el-submenu {
        padding: 0 20px;
    }
    .el-menu-item,
    ::v-deep .el-submenu__title {
        border-bottom: 0 !important;
        i.iconfont {
            color: #f6f6f6;
            font-size: 16px;
        }
        .icon-box {
            margin-right: 4px;
            vertical-align: top;
        }
        .text-box {
            line-height: 20px;
            color: #f6f6f6;
            font-size: 18px;
            &.is-active {
                color: var(--el-color-hover);
                font-weight: bold;
            }
        }
        .el-icon-arrow-down {
            margin-top: 2px;
            margin-left: 4px;
            color: #f6f6f6;
            font-size: 14px;
        }
        .el-icon-arrow-down:before {
            content: "\e790";
        }
    }
    .el-menu-item.is-active,
    .el-submenu.is-active {
        background-color: rgba(0, 0, 0, 0) !important;
        .text-box {
            color: var(--el-color-hover);
            font-weight: bold;
        }
    }
    .el-menu-item:hover .text-box {
        color: var(--el-color-hover) !important;
    }
    .menu-nav {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        &.is-active {
            .text-box {
                color: var(--el-color-hover);
                font-weight: bold;
            }
        }
    }

    .el-menu--horizontal {
        border: 0;
        & > .el-menu-item {
            height: 70px;
            line-height: 78px;
        }
    }

    ::v-deep {
        .el-menu-item.is-active,
        .is-active + .el-submenu__icon-arrow {
            color: var(--el-color-hover) !important;
        }
        .el-menu--horizontal > .el-submenu .el-submenu__title {
            height: 70px;
            line-height: 78px;
            padding-left: 34px;
        }
        .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
        .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
        .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
            background: rgba(0, 0, 0, 0) !important;
            color: #f6f6f6;
            &.is-active {
                color: var(--el-color-hover);
            }
        }
        .el-submenu.is-active .el-submenu__title:hover {
            .menu-nav {
                color: var(--el-color-hover);
            }
        }
    }
}
</style>
