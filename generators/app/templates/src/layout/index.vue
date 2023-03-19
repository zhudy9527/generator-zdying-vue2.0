<template>
    <el-container class="layout_container">
        <!-- 侧边栏 -->
        <side-bar class="layout_menu"></side-bar>
        <!-- 主要区域 -->
        <div class="layout_main ml70">
            <router-view class="layout_main_page" v-if="!$route.meta.keepAlive"></router-view>
            <keep-alive>
                <router-view class="avue-view" v-if="$route.meta.keepAlive" />
            </keep-alive>
        </div>
        <!-- loading -->
        <!-- <loading v-if="$store.state.loading" /> -->
    </el-container>
</template>

<script>
import sideBar from './components/sidebar/index.vue'
import loading from './components/loading.vue'
export default {
    name: 'layout',
    components: {
        sideBar,
        loading
    },
    data () {
        return {

        }
    },
    created () {
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.layout_container {
    width: 100%;
    height: 100%;
    display: flex;
    .layout_main {
        flex: 1;
        height: 100%;
        overflow-y: hidden;
        // background: #0c1b2c;
        &_page {
            width: 100%;
            height: 100%;
            background: #f3f3f3;
            border-radius: 12px 0 0 12px;
            box-sizing: border-box;
            overflow: hidden;
        }
    }
}
</style>
