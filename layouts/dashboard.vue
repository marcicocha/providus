<template>
  <div class="wrapper isRetailBackground">
    <div class="wrapper_container">
      <AppAdminSideBar class="sideBar" />
      <div class="page_container">
        <div class="userInfo">
          <img src="../assets/images/mheader.png" alt="" />
          <div class="details">
            <p>Adam Garbar</p>
            <p>Admin</p>
          </div>
        </div>
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
  background: #e5e5e5;
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
      position: relative;
      margin-left: 300px;
      padding: 50px 55px;
      width: 100%;
      background: #e5e5e5;
      height: 100vh;
      .userInfo {
        position: fixed;
        right: 0;
        top: 0;
        padding: 50px 55px;
        display: flex;
        img {
          border-radius: 100%;
          border: 3px solid #e8e8e8;
          margin-right: 15px;
        }
        .details p:first-child {
          font-family: 'GothamMedium', sans-serif;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 150%;
          color: #2e434e;
        }
        .details p:last-child {
          font-family: 'GothamLight', sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 150%;
          color: #2e434e;
        }
      }
      &:last-child {
        width: 100%;
      }
    }
  }
}
</style>
