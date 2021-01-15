<template>
  <div class="wrapper isRetailBackground">
    <div class="wrapper_container">
      <AppAdminSideBar class="sideBar" />
      <div id="dashboard" class="page_container">
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
  height: 200vh;
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
.wrapper::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 10px;
}

.wrapper::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(122, 153, 217)),
    color-stop(0.72, rgb(73, 125, 189)),
    color-stop(0.86, rgb(28, 58, 148))
  );
}
</style>
