<template>
  <div>
    <AppLoader v-if="isLoading" :class="loaderTag" />
    <div :class="pageTag" class="wrapper isRetailBackground">
      <div class="wrapper_container">
        <header>
          <img
            class="home-icon"
            src="../assets/images/logo.svg"
            alt="logo"
            @click="goHome"
          />
        </header>
        <div class="page_container">
          <Nuxt />
        </div>
        <footer></footer>
      </div>
    </div>
  </div>
</template>
<script>
import AppLoader from '@/components/UI/AppLoader.vue'
export default {
  components: {
    AppLoader,
  },
  data() {
    return {
      isLoading: true,
      loaderTag: {
        'animated fadeoutleft': false,
        hidden: false,
      },
      pageTag: {
        'animated fadeinright': false,
      },
    }
  },
  beforeMount() {
    const root = document.querySelector('html')
    root.classList.add('hide-scroller')
  },
  mounted() {
    this.initLoader()
  },
  methods: {
    initLoader() {
      const root = document.querySelector('html')
      root.classList.add('hide-scroller')
      setTimeout(() => {
        root.classList.remove('hide-scroller')
        this.loaderTag = {
          'animated fadeoutleft': true,
          hidden: false,
        }
        this.pageTag = {
          'animated fadeinright': true,
        }
      }, 3000)
    },
    goHome() {
      this.$router.push('/')
    },
  },
}
</script>
<style lang="scss" scoped>
.home-icon {
  cursor: pointer !important;
}
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
  //padding: 25px 30px;
  padding: 17px 30px;
  img {
    height: 100%;
  }
}
.page_container {
  //padding: 0 100px;
  padding: 20px 100px 0 100px;
}
.isRetailBackground {
  background-image: url('../assets/images/background-image-individual.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
footer {
  width: 100%;
  height: 87px;
  background-image: url('../assets/images/footer-pattern-new.png');
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
  grid-template-rows: 13% auto 13%;
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
