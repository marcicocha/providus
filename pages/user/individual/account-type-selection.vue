<template>
  <div class="parent-container">
    <AppTitleComponent
      heading="Open an Account"
      description="Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here."
    />
    <div class="account-info__block">
      <div><hr /></div>
      <div v-if="isAccountCategory">
        <h2>Select Account Category</h2>
        <div class="columns is-mobile">
          <div class="column">
            <AppCard :card-data="individual" @onClickHandler="onClickHandler" />
          </div>
          <div class="column">
            <AppCard :card-data="corporate" @onClickHandler="onClickHandler" />
          </div>
        </div>
      </div>
      <div v-if="isAccountType">
        <h2>Select Account Type</h2>
        <div class="columns is-mobile">
          <div class="column">
            <AppCard :card-data="savings" @onClickHandler="onClickHandler" />
          </div>
          <div class="column">
            <AppCard :card-data="current" @onClickHandler="onClickHandler" />
          </div>
        </div>
        <p class="notification">
          A reference form is required to open a Current Account,
          <a download>click here</a> to download, fill and make ready for
          upload.
        </p>
      </div>
      <div v-if="isBvn">
        <h2>BVN Validation</h2>
        <div>
          <AppInput
            v-model="accountInformation.BVN"
            label="BVN"
            placeholder="Enter Bank Verification Number"
          />
          <div style="height: 20px"></div>
          <AppButton
            title="Submit BVN"
            :disabled="!accountInformation.BVN"
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
          <div class="column is-5 bvn_image">
            <img
              :src="getImgUrl(bvnDetails.base64Image)"
              :alt="bvnDetails.firstName"
            />
          </div>
          <div class="column is-7">
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
    }
  },
  methods: {
    getImgUrl(pic) {
      return `data:image/png;base64,${pic}`
    },
    onClickHandler(value) {
      if (value === 'Individual') {
        this.$store.dispatch('SET_ACCOUNT_CATEGORY', 'individual')
        this.isAccountCategory = false
        this.isAccountType = true
        this.accountInformation = {
          accountCategory: 'INDIVIDUAL',
        }
      }
      if (value === 'Corporate') {
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
      }
      if (value === 'Current') {
        this.accountInformation = {
          ...this.accountInformation,
          accountType: 'CURRENT',
        }
        this.isBvn = true
        this.isAccountType = false
      }
    },
    async bvnValidationHandler() {
      // this.bvnDetails = {
      //   firstName: 'Bisi',
      //   lastName: 'Adewale',
      //   bvn: '000000000',
      //   phoneNumber1: '081009****',
      //   middleName: 'Ojo',
      // }
      // this.isBvn = false
      // this.isBvnDetails = true
      if (
        !this.accountInformation ||
        this.accountInformation.BVN === undefined ||
        this.accountInformation.BVN === ''
      ) {
        this.message = 'Your BVN seems to be incorrect,'
        return
      }
      try {
        this.message = ''
        const { response } = await this.$axios.$post(
          '/individual',
          this.accountInformation
        )
        await this.submitBvnInfoHandler(this.accountInformation)
        if (response) {
          this.bvnDetails = { ...response }
          this.isBvn = false
          this.isBvnDetails = true
        }
      } catch (err) {
        console.log(err.response.data.errorMessage, 'ERROR')
        const errorMessage = err.response.data.errorMessage
        if (errorMessage.includes('already exist')) {
          const { response } = await this.$axios.$get(
            `/individual/getCurrentWorkFlow?bvn=${this.accountInformation.BVN}`
          )
          console.log(response, 'RESPONSE')
          const nextWorkFlow = response.nextWorkFlow
          console.log(nextWorkFlow, 'neXt WORK')
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
          if (nextWorkFlow === 'LIVE_CHECK') {
            this.$router.replace('/user/individual/liveness-check')
          }
        } else {
          this.message = errorMessage
        }
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
      this.$router.replace('/user/individual/personal-information')
    },
    ...mapActions({
      submitBvnInfoHandler: 'individualModule/GET_BVN_INFORMATION',
    }),
  },
}
</script>
<style lang="scss" scoped>
h2 {
  font-family: 'GothamMedium', sans-serif;
  color: #fdb813;
  font-weight: bold;
  line-height: 24px;
  font-size: 18px;
  margin-bottom: 30px;
}
.account-info__block {
  width: 80%;
  //padding-top: 30px;
  padding-top: 20px;
}
hr {
  margin: 2rem 0 !important;
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
  bottom: 5%;
  font-size: 15px;
}
.error_message {
  color: #cc4c4c;
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
</style>
