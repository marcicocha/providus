<template>
  <div>
    <AppTitleComponent heading="Personal Information" />
    <div>
      <AppBasicInformation
        v-if="isBasicInformation"
        :personal-info-object="personalInfoObject"
        @basicInfoHandler="basicInfoHandler"
      />
      <AppNationalityInformation
        v-if="isNationalityInfo"
        :nationality-object="nationalityObject"
        @nationalityHandler="nationalityHandler"
        @updateNationalityDetails="updateNationalityDetails"
      />
      <AppIdentificationNumberInformation
        v-if="isIdentificationInfo"
        :personal-info-object="personalInfoObject"
        @identificationHandler="identificationHandler"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppBasicInformation from '@/components/user/individual/personal-information/AppBasicInformation.vue'
import AppNationalityInformation from '@/components/user/individual/personal-information/AppNationalityInformation.vue'
import AppIdentificationNumberInformation from '@/components/user/individual/personal-information/AppIdentificationNumberInformation.vue'
export default {
  components: {
    AppTitleComponent,
    AppBasicInformation,
    AppNationalityInformation,
    AppIdentificationNumberInformation,
  },
  data() {
    return {
      isBasicInformation: true,
      isNationalityInfo: false,
      isIdentificationInfo: false,
      personalInfoObject: {
        currency: 'NGN',
      },
      nationalityObject: {},
    }
  },
  methods: {
    nationalityHandler() {
      this.isNationalityInfo = false
      this.isIdentificationInfo = true
    },
    updateNationalityDetails(value) {
      this.nationalityObject = {
        nationality: value,
      }
    },
    basicInfoHandler() {
      this.isBasicInformation = false
      this.isNationalityInfo = true
    },
    async identificationHandler() {
      if (!this.personalInfoObject) {
        return
      }
      const response = this.$cookies.get('requestId')
      const personalInfoObject = {
        ...this.personalInfoObject,
        ...this.nationalityObject,
        requestId: response,
        foreignNationality:
          this.nationalityObject.nationality === 'FOREIGN' ? 'YES' : 'NO',
      }
      try {
        await this.$axios.$put('/individual/personalInfo', personalInfoObject)
        await this.submitPersonalInfoHandler(personalInfoObject)
        this.$router.replace('/user/individual/contact-information')
      } catch (err) {}
    },
    ...mapActions({
      submitPersonalInfoHandler: 'individualModule/POST_PERSONAL_INFORMATION',
    }),
  },
}
</script>
