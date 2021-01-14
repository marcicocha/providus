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
        <div class="columns">
          <div class="column">
            <AppCard :card-data="individual" @onClickHandler="onClickHandler" />
          </div>
          <div class="column">
            <nuxt-link to="/user/corporate/representative-details"
              ><AppCard :card-data="corporate"
            /></nuxt-link>
          </div>
        </div>
      </div>
      <div v-if="isAccountType">
        <h2>Select Account Type</h2>
        <div class="columns">
          <div class="column">
            <AppCard :card-data="savings" @onClickHandler="onClickHandler" />
          </div>
          <div class="column">
            <AppCard :card-data="current" @onClickHandler="onClickHandler" />
          </div>
        </div>
      </div>
      <div v-if="isBvn">
        <h2>BVN Validation</h2>
        <div>
          <AppInput
            v-model="accountInformation.bvn"
            label="BVN"
            placeholder="Enter Bank Verification Number"
          />
          <div style="height: 30px"></div>
          <AppButton title="Submit BVN" @click="bvnValidationHandler" />
        </div>
        <div></div>
      </div>
      <div v-if="isBvnDetails">
        <div class="columns">
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
            <div class="columns">
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
        <div class="columns">
          <div class="column">
            <AppButton
              title="Return"
              color="secondary"
              @click="returnHandler"
            />
          </div>
          <div class="column">
            <nuxt-link to="/user/individual/personal-information"
              ><AppButton title="Continue"
            /></nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
    }
  },
  methods: {
    getImgUrl(pic) {
      return `data:image/png;base64,${pic}`
    },
    onClickHandler(value) {
      if (value === 'Individual') {
        this.isAccountCategory = false
        this.isAccountType = true
        this.accountInformation = {
          accountCategory: 'INDIVIDUAL',
        }
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
      console.log(this.accountInformation, 'Account Info:::::')
      try {
        const { response } = await this.$axios.$post(
          '/individual',
          this.accountInformation
        )
        if (response) {
          this.bvnDetails = { ...response }
          this.isBvn = false
          this.isBvnDetails = true
        }
      } catch (err) {
        console.log(err)
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
  padding-top: 30px;
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
    font-style: normal;
    font-weight: 500;
  }
}
.bvn_image {
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
