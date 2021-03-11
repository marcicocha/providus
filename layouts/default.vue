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
          <Nuxt v-if="isMobile" />
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
import { isBrowser } from 'browser-or-node'
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
      isMobile: false,
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
    this.$cookies.removeAll()
  },
  methods: {
    initLoader() {
      const root = document.querySelector('html')
      root.classList.add('hide-scroller')
      this.$loadScript('https://webrtc.github.io/adapter/adapter-latest.js')
        .then(() => {
          this.loading = false
          this.$loadScript('/daon/daon.js').then(() => {
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
          })
        })
        .catch((err) => {
          // Failed to fetch script
          this.loading = false
          let errorMessage = ''

          // Error Message from Backend
          // eslint-disable-next-line no-prototype-builtins
          if (err.hasOwnProperty('response')) {
            const res = err.response
            errorMessage = res.data.errorMessage

            this.$toast.open({
              message: `<p class="toast-title">Error Message</p>
                    <p class="toast-msg"> ${errorMessage} </p>`,
              type: 'error',
              duration: 4000,
              dismissible: true,
            })
          }
        })
    },
    goHome() {
      this.$router.push('/')
    },
    handleResize() {
      if (isBrowser) {
        const isMobile = {
          Android() {
            return navigator.userAgent.match(/Android/i)
          },
          BlackBerry() {
            return navigator.userAgent.match(/BlackBerry/i)
          },
          iOS() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
          },
          Opera() {
            return navigator.userAgent.match(/Opera Mini/i)
          },
          Windows() {
            return navigator.userAgent.match(/IEMobile/i)
          },
          any() {
            return (
              isMobile.Android() ||
              isMobile.BlackBerry() ||
              isMobile.iOS() ||
              isMobile.Opera() ||
              isMobile.Windows()
            )
          },
        }

        this.isMobile = isMobile.any() !== null
      }
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

@media only screen and (max-width: 768px) {
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
  .back-button {
    display: inline;
    align-content: center;
    position: relative;
    right: 0;
  }
}

@media only screen and (min-width: 769px) and (max-width: 1024px) {
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
    padding: 20px 30px;
    // padding: 17px 30px;
    img {
      height: 100%;
    }
  }
  .card {
    height: 150px !important;
  }
  .parent-container {
    width: 100% !important;
    position: relative;
  }
  .page_container {
    padding: 0 30px;
  }
  .web_footer {
    display: block;
  }
  .mobile_footer {
    display: none;
  }
  .account-info__block {
    width: 100%;
    padding-top: 0;
  }
  .back-button {
    display: inline;
    align-content: center;
    position: absolute;
    right: 41px;
    margin-top: 7px;
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
  .back-button {
    display: inline;
    align-content: center;
    position: relative;
    right: 0;
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
