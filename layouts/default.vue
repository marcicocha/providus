<template>
  <div class="wrapper isRetailBackground">
    <div class="wrapper_container">
      <header>
        <img src="../assets/images/logo.svg" alt="logo" />
      </header>
      <div class="page_container">
        <Nuxt />
      </div>
      <footer>
        <img src="../assets/images/group.jpg" alt="footer-pattern" />
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: auto;
  flex-grow: 1;
  margin: 0 auto;
  height: 100vh;
}
header {
  text-align: right;
  max-height: 200px;
  padding: 30px;
  img {
    height: 100%;
  }
}
.page_container {
  padding: 40px;
}
.isRetailBackground {
  background-image: url('../assets/images/background-image-individual.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
footer {
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/footer-pattern.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.wrapper_container {
  display: grid;
  grid-template-rows: 15% auto 13%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 80px;
  width: 40vw;
  height: 85vh;
  margin: auto;
  background-color: #fff;
}
</style>
