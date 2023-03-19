<template>
    <div>
        <el-button @click="goHome">登录</el-button>
    </div>
</template>
<script>
export default {
    methods: {
        goHome () {
            this.$router.push('/home')
        }
    }
}
</script>
<style scoped lang="less">
</style>