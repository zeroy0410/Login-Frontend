<template>
    <nav>
        <el-header>
            <router-link tag="button" to="/">Home</router-link>
            <router-link v-if="!isLogin" to="/login">Login</router-link>
            <router-link v-if="!isLogin" to="/join">Join</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/profile" v-if="isLogin">你好，{{ username }}</router-link>
            <el-button v-if="isLogin" @click="logoutHandler">登出</el-button>
        </el-header>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { logout } from '@/api/account'
import { ElMessage } from 'element-plus';
import router from '@/router';
// import router from '@/router';
export default defineComponent({
    name: "NavigationBar",
    methods: {
        logoutHandler() {
            this.isLogin = false;
            logout().then(() => {
                ElMessage.closeAll()
                ElMessage.success('已登出')
                this.$router.push("/login")
            }).catch((err: Error) => {
                ElMessage.closeAll()
                ElMessage.error('登出失败 ' + err.message)
            })
        }
    },
    setup() {
        const isLogin = ref(false);
        const username = ref("");
        return {
            isLogin,
            username,
        }
    },
    mounted() {
        this.username = localStorage.getItem('nick-name') || '';
        this.isLogin = localStorage.getItem('login') === 'true';
    },
})
</script>

<style>

</style>