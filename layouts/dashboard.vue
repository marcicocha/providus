<template>
  <div class="wrapper isRetailBackground">
    <div class="wrapper_container">
      <AppAdminSideBar class="sideBar" />
      <div class="page_container">
        <Nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import AppAdminSideBar from '@/components/AppAdminSideBar.vue'
export default {
  components: {
    AppAdminSideBar,
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: auto;
  flex-grow: 1;
  margin: 0 auto;
  height: 100vh;
  .wrapper_container {
    display: flex;
    width: 100%;
    .sideBar {
      width: 300px;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
    }
    .page_container {
      margin-left: 300px;
      padding: 50px 55px;
    }
  }
}
</style>
