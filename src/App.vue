<template>
  <el-card class="box-card" style="margin: 100px;height:600px;">
    <NavigationBar></NavigationBar>
    <div style="padding: 10px;">
      <router-view/>
    </div>
  </el-card>
</template>

<script lang="ts">
import NavigationBar from '/src/components/NavigationBar.vue';
import setupWithToken from "./api/token";
export default {
  components: {NavigationBar},
  setup() {
    setupWithToken()
  },
}
</script>

<style lang="scss">
  nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: #ce94d8;
    text-decoration: none;
    padding: 10px;
    &.router-link-exact-active {
      color: #8e24aa;
    }
  }
}
</style>