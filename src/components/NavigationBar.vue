<template>
    <nav>
        <el-header>
            <router-link tag="button" to="/">Home</router-link>
            <router-link to="/login">Login</router-link>
            <router-link to="/join">Join</router-link>
            <router-link to="/about">About</router-link>
        </el-header>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import router from '@/router';
export default defineComponent({
    name: "NavigationBar",

})
</script>

<style>

</style>