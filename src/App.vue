<template>
    <NavigationBar></NavigationBar>
  <div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import NavigationBar from '/src/components/NavigationBar.vue';
import setupWithToken from "@/api/token";
export default {
  components: {NavigationBar},
  setup() {
    setupWithToken()
  },
}
</script>

<style lang="scss">
  nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>