<template>
  <div>
    <AppLoader v-if="isLoading" :class="loaderTag" />
    <div
      :style="pageTag"
      :class="{
        wrapper: true,
        retail_background: accountCategory === 'individual',
        corporate_background: accountCategory === 'corporate',
      }"
    >
      <div class="wrapper_container">
        <header>
          <img
            class="home-icon"
            src="../assets/images/logo.svg"
            alt="logo"
            @click="goHome"
          />
        </header>
        <footer class="mobile_footer">
          <img
            v-if="accountCategory === 'individual'"
            src="~assets/images/footer-pattern-individual.png"
            alt="footer-pattern"
          />
          <img
            v-if="accountCategory === 'corporate'"
            src="~assets/images/footer-pattern-corporate.png"
            alt="footer-pattern"
          />
        </footer>
        <div class="page_container">
          <!-- Development -->
          <!-- <Nuxt /> -->

          <!-- Production -->
          <Nuxt v-if="window.width <= 1200" />
          <div v-else class="not_available__desktop">
            <p>
              <i style="color: #fdb813" class="fas fa-bell" /> This application
              is not available for desktop use, please use on a mobile device
            </p>
          </div>
        </div>
        <footer class="web_footer">
          <img
            v-if="accountCategory === 'individual'"
            src="~assets/images/footer-pattern-individual.png"
            alt="footer-pattern"
          />
          <img
            v-if="accountCategory === 'corporate'"
            src="~assets/images/footer-pattern-corporate.png"
            alt="footer-pattern"
          />
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
      window: {
        width: 0,
        height: 0,
      },
    }
  },
  computed: {
    ...mapState({
      accountCategory: (state) => state.accountCategory,
    }),
  },
  beforeMount() {
    const root = document.querySelector('html')
    root.classList.add('hide-scroller')
  },
  mounted() {
    this.initLoader()
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
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
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
  },
}
</script>
<style lang="scss" scoped>
.home-icon {
  cursor: pointer !important;
}

.not_available__desktop {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  font-weight: 600;
}

.wrapper {
  position: relative;
  width: auto;
  flex-grow: 1;
  margin: 0 auto;
  height: 100vh;
}

.page_container {
  padding: 10px 18px;
  // overflow: scroll;
}

.retail_background {
  background-image: url('../assets/images/background-image-individual.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.corporate_background {
  background-image: url('../assets/images/corporate-background-image.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

footer {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
}

@media only screen and (max-width: 1024px) {
  .web_footer {
    display: none;
  }
  .mobile_footer {
    display: block;
  }
  .wrapper_container {
    display: grid;
    grid-template-rows: 10% 8% auto;
    width: 100%;
    height: 100%;
    margin: auto;
    background-color: #fff;
  }
  footer {
    img {
      object-fit: cover;
    }
  }
  header {
    padding: 20px;
    padding-bottom: 0px;
    text-align: center;

    img {
      height: 100%;
    }
  }
}

@media only screen and (min-width: 1025px) {
  .wrapper_container {
    display: grid;
    grid-template-rows: 13% auto 13%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 80px;
    width: 45vw;
    height: 85vh;
    margin: auto;
    background-color: #fff;
  }
  header {
    text-align: right;
    padding: 25px 30px;
    // padding: 17px 30px;
    img {
      height: 100%;
    }
  }
  .page_container {
    padding: 20px 100px 0 100px;
  }
  .web_footer {
    display: block;
  }
  .mobile_footer {
    display: none;
  }
}

@media only screen and (min-width: 1536px) {
  .web_footer {
    display: block;
  }
  .mobile_footer {
    display: none;
  }
  @media only screen and (min-height: 730px) {
    .wrapper_container {
      display: grid;
      grid-template-rows: 12% auto 12%;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 80px;
      width: 40vw;
      height: 87vh;
      margin: auto;
      background-color: #fff;
    }
    header {
      text-align: right;
      padding: 15px 30px;
      // padding: 17px 30px;
      img {
        height: 100%;
      }
    }
    .page_container {
      padding: 0 100px 0 100px;
    }
  }
  @media only screen and (min-height: 900px) {
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
    header {
      text-align: right;
      padding: 25px 30px;
      // padding: 17px 30px;
      img {
        height: 100%;
      }
    }
    .page_container {
      padding: 20px 100px 0 100px;
    }
  }
}

@media only screen and (max-width: 596px) {
  footer {
    img {
      object-fit: cover;
    }
  }
}
</style>
