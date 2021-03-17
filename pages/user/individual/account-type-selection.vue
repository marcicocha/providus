<template>
  <div class="parent-container">
    <a v-if="!isAccountCategory" class="back-button" @click="backButtonHandler"
      ><img src="~assets/images/back-arrow.svg" alt="back-button" />
      <span>Back</span></a
    >
    <AppTitleComponent
      heading="Open an Account"
      description="Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here."
    />
    <div class="account-info__block">
      <div><hr /></div>
      <div v-if="isAccountCategory">
        <h2>Select Account Category</h2>
        <div class="columns is-mobile">
          <div class="column is-6">
            <AppCard :card-data="individual" @onClickHandler="onClickHandler" />
          </div>
          <div class="column is-6">
            <!-- <AppCard :card-data="corporate" @onClickHandler="onClickHandler" /> -->
            <AppCard
              class="opaque"
              :card-data="corporate"
              @onClickHandler="() => {}"
            />
          </div>
        </div>
      </div>
      <div v-if="isAccountType">
        <h2>Select Account Type</h2>
        <div class="columns is-mobile">
          <div class="column is-6">
            <AppCard :card-data="savings" @onClickHandler="onClickHandler" />
          </div>
          <div class="column is-6">
            <AppCard :card-data="current" @onClickHandler="onClickHandler" />
          </div>
        </div>
        <p class="notification">
          Two Reference forms are required to open a Current Account,
          <a :href="baseUrl + `/forms/download/referenceForm`" download
            >click here</a
          >
          to download, fill and make ready for upload.
        </p>
      </div>
      <div v-if="isBvn">
        <h2>BVN Validation</h2>
        <div>
          <AppInput
            v-model="accountInformation.BVN"
            label="BVN"
            placeholder="Enter Bank Verification Number"
            :disabled="isLoading"
            is-number
            max-length="11"
            min-length="11"
          />
          <div style="height: 20px"></div>
          <AppButton
            title="Submit BVN"
            :disabled="!accountInformation.BVN"
            :loading="isLoading"
            @click="bvnValidationHandler"
          />
          <p :class="{ notification: true, error_message: message }">
            <span style="display: block">{{ message }}</span>
            <span>Dial *565*0# to check your Bank Verification Number</span>
          </p>
        </div>
        <div></div>
      </div>
      <div v-if="isBvnDetails">
        <div class="columns is-mobile">
          <div class="column is-6 bvn_image">
            <img
              :src="getImgUrl(bvnDetails.base64Image)"
              :alt="bvnDetails.firstName"
            />
          </div>
          <div class="column is-6">
            <div class="bvn-child__block">
              <small>BVN</small>
              <p style="font-weight: bolder">{{ bvnDetails.bvn }}</p>
            </div>
            <div class="bvn-child__block">
              <small>Surname and First Name</small>
              <p>{{ `${bvnDetails.lastName} ${bvnDetails.firstName}` }}</p>
            </div>
            <div class="columns is-mobile">
              <div class="column">
                <div class="bvn-child__block">
                  <small>Phone Number</small>
                  <p>{{ bvnDetails.phoneNumber1 }}</p>
                </div>
              </div>
              <div class="column">
                <div class="bvn-child__block">
                  <small>Middle Name</small>
                  <p>{{ bvnDetails.middleName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="height: 30px"></div>
        <div class="columns is-mobile">
          <div class="column">
            <AppButton
              title="Return"
              color="secondary"
              @click="returnHandler"
            />
          </div>
          <div class="column">
            <AppButton title="Continue" @click="nextHandler" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppCard from '@/components/user/individual/account-type-selection/AppCard'
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppCard,
    AppInput,
    AppButton,
  },
  data() {
    return {
      isAccountType: false,
      isLoading: false,
      isAccountCategory: true,
      isBvn: false,
      isBvnDetails: false,
      individual: {
        description: 'Individual',
        imageSrc: 'individual.svg',
      },
      corporate: {
        description: 'Corporate',
        imageSrc: 'corporate.svg',
      },
      savings: {
        description: 'Savings',
        imageSrc: 'purse.svg',
      },
      current: {
        description: 'Current',
        imageSrc: 'cash.svg',
      },
      accountInformation: {},
      bvnDetails: {},
      message: '',
      fetching: false,
      baseUrl: process.env.BASE_URL,
    }
  },
  methods: {
    getImgUrl(pic) {
      return `data:image/png;base64,${pic}`
    },
    backButtonHandler() {
      if (this.isAccountType) {
        this.isAccountType = false
        this.isAccountCategory = true
        return
      }
      if (this.isBvn) {
        this.isBvn = false
        this.isAccountType = true
        return
      }
      if (this.isBvnDetails) {
        this.isBvnDetails = false
        this.isBvn = true
      }
    },
    onClickHandler(value) {
      if (value === 'Individual') {
        this.$store.dispatch('SET_ACCOUNT_CATEGORY', 'individual')
        this.isAccountCategory = false
        this.isAccountType = true
        this.accountInformation = {
          accountCategory: 'INDIVIDUAL',
        }
        console.log(this.baseUrl, 'BASE URL')
      }
      if (value === 'Corporate') {
        // Disable Coperate until we're ready
        this.$store.dispatch('SET_ACCOUNT_CATEGORY', 'corporate')
        this.$router.replace('/user/corporate/representative-details')
      }
      if (value === 'Savings') {
        this.accountInformation = {
          ...this.accountInformation,
          accountType: 'SAVINGS',
        }
        this.isBvn = true
        this.isAccountType = false
        this.$cookies.set('accountType', 'SAVINGS')
      }
      if (value === 'Current') {
        this.accountInformation = {
          ...this.accountInformation,
          accountType: 'CURRENT',
        }
        this.isBvn = true
        this.isAccountType = false
        this.$cookies.set('accountType', 'CURRENT')
      }
    },
    async getRequestId(value) {
      try {
        const { response } = await this.$axios.$get(
          `/individual/getRequestIdByBvn?bvn=${value}`
        )
        this.$cookies.set('requestId', response.requestId)
      } catch (err) {
        let errorMessage = 'Network Error'

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
      }
    },
    async bvnValidationHandler() {
      if (
        !this.accountInformation ||
        this.accountInformation.BVN === undefined ||
        this.accountInformation.BVN === ''
      ) {
        this.message = 'BVN field is required to proceed,'
        this.$toast.open({
          message: `<p class="toast-title">BVN Validation Message</p>
                    <p class="toast-msg"> ${this.message} </p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
        return
      }

      if (this.accountInformation.BVN.length !== 11) {
        this.message = 'BVN length should be 11'

        this.$toast.open({
          message: `<p class="toast-title">BVN Validation Message</p>
                    <p class="toast-msg"> ${this.message} </p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
        return
      }

      this.fetching = true
      try {
        this.message = ''
        this.isLoading = true
        const { response } = await this.$axios.$post(
          '/individual',
          this.accountInformation
        )
        await this.submitBvnInfoHandler(this.accountInformation)
        this.getRequestId(this.accountInformation.BVN)
        this.bvnDetails = { ...response }
        this.isBvn = false
        this.isBvnDetails = true
        this.isLoading = false
        this.fetching = false
      } catch (err) {
        this.isLoading = false
        this.fetching = false

        let errorMessage = 'Network Error'

        // Network Error
        if (String(err).includes('Network')) {
          errorMessage = err
          this.$toast.open({
            message: `<p class="toast-title">Error Message</p>
                    <p class="toast-msg"> ${errorMessage} </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true,
          })
          return
        }

        const error = err.response.data.errorMessage

        // Application already completed with BVN entered
        if (String(error).toLowerCase().includes('already completed')) {
          errorMessage = error
          this.$toast.open({
            message: `<p class="toast-title">Registration Status</p>
                    <p class="toast-msg"> ${errorMessage} </p>`,
            type: 'info',
            duration: 4000,
            dismissible: true,
          })
          return
        }

        // BVN Already Exists
        if (error.includes('already exist')) {
          const { response } = await this.$axios.$get(
            `/individual/getCurrentWorkFlow?bvn=${this.accountInformation.BVN}`
          )
          this.getRequestId(this.accountInformation.BVN)

          const nextWorkFlow = response.nextWorkFlow
          if (nextWorkFlow === 'PERSONAL_INFO') {
            this.$router.replace('/user/individual/personal-information')
          }
          if (nextWorkFlow === 'CONTACT') {
            this.$router.replace('/user/individual/contact-information')
          }
          if (nextWorkFlow === 'KIN_DETAILS') {
            this.$router.replace('/user/individual/kin-information')
          }
          if (nextWorkFlow === 'SELFIE') {
            this.$router.replace('/user/individual/capture-selfie')
          }
          if (nextWorkFlow === 'ID_UPLOAD') {
            this.$router.replace('/user/individual/capture-id')
          }
          if (nextWorkFlow === 'UTILITY_BILL') {
            this.$router.replace('/user/individual/capture-utility')
          }
          if (nextWorkFlow === 'DOC_UPLOAD') {
            this.$router.replace('/user/individual/upload-document')
          }
          if (nextWorkFlow === 'LIVENESS_CHECK') {
            this.$router.replace('/user/individual/liveness-check')
          }
          return
        }

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
          return
        }

        this.fetching = false
      }
    },
    returnHandler() {
      this.isBvn = true
      this.isBvnDetails = false
      this.bvnDetails = {}
      this.accountInformation = {
        ...this.accountInformation,
        bvn: '',
      }
    },
    nextHandler() {
      this.$router.replace('/user/individual/capture-selfie')
      // this.$router.replace('/user/individual/personal-information')
    },
    ...mapActions({
      submitBvnInfoHandler: 'individualModule/GET_BVN_INFORMATION',
    }),
  },
}
</script>
<style lang="scss" scoped>
.opaque,
.opaque:hover {
  opacity: 0.4 !important;
  // border: none !important;
  border: 1.5px solid #eaeaea;
}
.back-button {
  span {
    margin-left: 5px;
  }
}
.account-info__block {
  width: 100%;
  padding-top: 0;
}
.bvn-child__block {
  padding-bottom: 15px;
  small {
    font-size: 12px;
  }
  p {
    font-family: 'GothamLight', sans-serif;
    font-style: normal;
    font-weight: 600;
  }
}
.bvn_image {
  img {
    height: 100%;
    width: 100%;
  }
}
.parent-container {
  width: 90%;
  position: relative;
}
.notification {
  position: absolute;
  bottom: 10%;
  font-size: 15px;
}
.error_message {
  color: #cc4c4c;
}
@media only screen and (min-width: 1025px) {
  .account-info__block {
    width: 95%;
    padding-top: 0;
  }
  .parent-container {
    width: 90%;
    position: relative;
  }
}
@media only screen and (min-width: 1536px) {
  .account-info__block {
    width: 80%;
    //padding-top: 30px;
    padding-top: 10px;
  }
  .parent-container {
    width: 90%;
    position: relative;
  }
  .back-button {
    font-size: 1em;
  }
  @media only screen and (min-height: 730px) {
    hr {
      margin: 1rem 0 !important;
    }
    .back-button {
      font-size: 13px !important;
    }
    .account-info__block {
      padding-top: 0;
      width: 85%;
    }
    .notification {
      bottom: 0;
      font-size: 13px;
    }
    h2 {
      font-size: 16px;
    }
  }
  @media only screen and (min-height: 900px) {
    hr {
      margin: 2rem 0 !important;
    }
    .back-button {
      font-size: 1em;
    }
    .account-info__block {
      padding-top: 10px;
      width: 80%;
    }
    .notification {
      position: absolute;
      bottom: 5%;
      font-size: 15px;
    }
    h2 {
      font-size: 18px;
    }
  }
}
@media only screen and (max-width: 991px) {
  .account-info__block {
    width: 100%;
    padding-top: 0;
  }
  .parent-container {
    width: 100%;
  }
  .notification {
    font-size: 14px;
  }
  h2 {
    font-size: 16px;
  }
  .bvn-child__block {
    padding-bottom: 15px;
    small {
      font-size: 11px;
    }
    p {
      font-size: 14px;
    }
  }
}
@media only screen and (max-width: 767px) {
  h2 {
    line-height: 1px;
    font-size: 15px;
    margin-bottom: 20px;
  }
  .notification {
    position: absolute;
    bottom: 13%;
    font-size: 12px;
  }
  .back-button {
    font-size: 13px;
  }
}
</style>
