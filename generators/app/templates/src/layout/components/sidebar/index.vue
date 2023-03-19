<template>
    <div class="layout_sidebar" :class="{ collapse: collapse }">
        <div class="layout_sidebar_header" @click="collapse = !collapse">
            <img :src="logo" alt />
        </div>
        <div class="layout_sidebar_main">
            <el-popover
                placement="right"
                trigger="hover"
                v-for="value in routes"
                :key="value.id"
                :disabled="!childrenRoute(value.children).length"
                popper-class="popper_sidebar_item"
            >
                <div class="sidebar_children">
                    <div
                        v-for="item in childrenRoute(value.children)"
                        :key="item.id"
                        @click.stop="routerClick(item.route, item, value)"
                    >
                        <div class="sidebar_children_item">
                            <span>{{ item.name }}</span>
                            <!-- <cl-svg-icon class="more-arrow ml10" icon-class="more-arrow"></cl-svg-icon> -->
                        </div>
                    </div>
                </div>

                <template #reference>
                    <div
                        @click.stop="routerClick(value.route, value)"
                        @mouseenter="mouseenter(value.route)"
                        @mouseleave.stop="mouseLeave()"
                        :class="{ 'is-active': routeItem === value.route }"
                    >
                        <div class="layout_sidebar_item">
                            <!-- <cl-svg-icon class="sidebar_img" :icon-class="value.key"></cl-svg-icon> -->
                            <span>{{ value['name'] }}</span>
                        </div>
                    </div>
                </template>
            </el-popover>
        </div>
        <div class="layout_sidebar_footer">
            <!-- <cl-svg-icon
                @click.native="collapse = !collapse"
                class="more_version"
                icon-class="more-version"
            ></cl-svg-icon>-->
            <span>{{ currentVer }}</span>
            <!-- <cl-svg-icon
                @click.native="routerClick('/home/version/index')"
                v-if="!collapse"
                class="more-arrow"
                icon-class="more-arrow"
            ></cl-svg-icon>-->
        </div>
    </div>
</template>
<script>
const packageInfo = require('/package.json');
export default {
    name: 'Side',
    components: {},
    data () {
        return {
            currentVer: packageInfo.version,
            routeItem: '', // click 时的一级路由的高亮
            hoverItem: '', // hover时,一级路由的高亮
            collapse: false, // 展开
            showChildren: false, //  hover时,二级菜单高亮
            logo: ''
        };
    },
    computed: {
        routes () {
            return this.$store.state.menuList;
        },
        // 子路由
        childrenRoute () {
            return (children) => {
                if (!children) return [];
                let res = children.filter((item) => item.type === 'menu' && !item.hidden);
                return res;
            };
        },
    },
    mounted () {

    },
    methods: {
        /* 路由跳转 */
        routerClick (path) {
            this.$router.push(path);

        },
        // 鼠标移入显示二级菜单
        mouseenter (path) {
            this.hoverItem = path;
            this.showChildren = true;
        },
        // 鼠标移出关闭二级菜单
        mouseLeave () {
            this.showChildren = false;
            this.hoverItem = this.routeItem;
        },
    },
};
</script>

<style lang="less" scoped>
.is-active {
    background: #3663e1;
    border-radius: 12px;
    .sidebar_img {
        color: #fff !important;
    }
    span {
        color: #fff !important;
    }
}
.layout_sidebar {
    width: 180px;
    height: 100%;
    background: #0c1b2c;
    box-sizing: border-box;
    position: relative;
    .more-arrow {
        width: 14px !important;
        height: 14px !important;
        display: none;
        margin-left: 5px;
    }
    &_header {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: absolute;
        top: 24px;
        padding: 0 10px;
        box-sizing: border-box;
        z-index: 2;
        background: linear-gradient(180deg, #0c1b2c 90%, rgba(12, 27, 44, 0) 100%);
        img {
            width: 54px;
            height: 54px;
        }
    }
    &_footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        font-size: 16px;
        padding: 0 10px 0 13px;
        box-sizing: border-box;
        color: rgba(255, 255, 255, 0.4);
        z-index: 2;
        cursor: pointer;
        background: linear-gradient(360deg, #0c1b2c 0%, #0c1b2c 55.83%, rgba(12, 27, 44, 0) 100%);
        .more_version {
            width: 44px !important;
            height: 44px !important;
            margin-right: 5px;
        }
        > span {
            font-family: 'AkrobatMedium';
            font-size: 18px;
            color: rgba(255, 255, 255, 0.8);
        }
        &:hover {
            color: rgba(255, 255, 255, 1);
            > span {
                color: rgba(255, 255, 255, 0.8);
            }
            .more-arrow {
                display: block;
                color: rgba(255, 255, 255, 0.8);
                margin-left: 24px;
            }
        }
    }
    &_main {
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 105px;
        z-index: 1;
        max-height: calc(100% - 140px);
        margin-top: -20px;
        padding: 20px 10px;
        font-size: 14px;
        color: #ffffff;
        overflow-y: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
.layout_sidebar_item {
    width: 100%;
    min-width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 3px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    margin-bottom: 6px;
    &:hover {
        // @extend .is-active;
    }
    .sidebar_img {
        width: 44px !important;
        height: 44px !important;
        color: #a9adb1;
    }
    > span {
        color: rgba(255, 255, 255, 0.7);
        margin-left: 1px;
        font-size: 14px;
    }
}
// 折叠
.collapse {
    width: 70px;
    .layout_sidebar_item,
    .layout_sidebar_footer {
        > span {
            display: none;
        }
        .more_version {
            opacity: 0.5;
        }
    }
}
</style>

<style lang="less" scoped>
/* 弹出框相关样式 */
.popper_sidebar_item {
    min-width: 50px;
    margin-left: 17px;
    padding: 0;
    border: none;
    border-radius: 8px;
    // .popper__arrow {
    //     border-right-color: $base-color-window-header !important;
    //     &::after {
    //         border-right-color: $base-color-window-header !important;
    //     }
    // }
}

.sidebar_children {
    min-width: 160px;
    background: #0c1b2c;
    padding: 8px;
    border-radius: 6px;
    box-sizing: border-box;
    &_item {
        display: inline-block;
        min-width: 140px;
        height: 44px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;
        position: relative;
        justify-content: space-between;
        span {
            color: rgba(255, 255, 255, 0.7);
        }
        .more-arrow {
            display: none;
        }
        cursor: pointer;
        &:hover {
            background: #3663e1;
            color: #fff;
            .sidebar_img {
                color: #fff !important;
            }
            span {
                font-family: SysFontM;
                color: #fff;
            }
            border-radius: 6px;
            .more-arrow {
                display: block;
                color: #fff;
            }
        }
    }
}
div:focus,
span:focus {
    outline: none !important;
}
</style>
