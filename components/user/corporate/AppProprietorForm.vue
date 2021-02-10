<template>
  <div>
    <div class="columns is-gapless is-mobile">
      <div class="column is-4">
        <AppSelectHybrid
          v-model="proprietorDetailsObject.title"
          label="Title"
          placeholder="Select"
          :data="['Miss', 'Mrs', 'Mister']"
          url="/globalData/data?name=TITLE"
          :call-back-func="
            (resp) => ({
              text: resp,
              value: resp,
            })
          "
        />
      </div>
      <div class="surname column is-8">
        <AppInput
          v-model="proprietorDetailsObject.surname"
          label="Surname"
          placeholder="Type Surname"
          is-text
        />
      </div>
    </div>
    <AppInput
      v-model="proprietorDetailsObject.firstName"
      label="First Name"
      placeholder="Type First Name"
      is-text
    />
    <AppInput
      v-model="proprietorDetailsObject.email"
      label="Email Address"
      placeholder="Enter Proprietor's email address"
    />
    <AppInput
      v-model="proprietorDetailsObject.bvn"
      placeholder="Enter Proprietor's Bank Verification Number"
      label="BVN"
      is-number
      max-length="11"
      min-length="11"
    />
    <div class="button_container">
      <p v-if="!isAddedToList">
        <a @click="addProprietorFormHandler"
          ><span class="icon"> <i class="fas fa-plus"></i> </span
        ></a>
      </p>
      <p v-if="isAddedToList">
        <a @click="editProprietorFormHandler"
          ><span class="icon"> <i class="fas fa-pen"></i> </span
        ></a>
      </p>
      <p v-if="isAddedToList">
        <a @click="removeProprietorFormHandler"
          ><span class="icon"> <i class="fas fa-trash"></i> </span
        ></a>
      </p>
    </div>
  </div>
</template>
<script>
import AppInput from '@/components/UI/AppInput'
import AppSelectHybrid from '@/components/UI/AppSelectHybrid'

export default {
  name: 'AppProprietorForm',
  components: {
    AppInput,
    AppSelectHybrid,
  },
  props: {
    proprietorDetailsObject: {
      type: Object,
      default: () => ({}),
    },
    isAddedToList: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    validationHandler() {
      if (
        this.proprietorDetailsObject.title === '' ||
        this.proprietorDetailsObject.title === undefined
      ) {
        this.errorMessageHandler('Title')
        return true
      }
      if (
        this.proprietorDetailsObject.firstName === '' ||
        this.proprietorDetailsObject.firstName === undefined
      ) {
        this.errorMessageHandler('First Name')
        return true
      }
      if (
        this.proprietorDetailsObject.surname === '' ||
        this.proprietorDetailsObject.surname === undefined
      ) {
        this.errorMessageHandler('Surname')
        return true
      }
      if (
        this.proprietorDetailsObject.email === '' ||
        this.proprietorDetailsObject.email === undefined
      ) {
        this.errorMessageHandler('Email')
        return true
      }
      if (
        this.proprietorDetailsObject.bvn === '' ||
        this.proprietorDetailsObject.bvn === undefined
      ) {
        this.errorMessageHandler('BVN')
        return true
      }
      if (this.proprietorDetailsObject.bvn.length !== 11) {
        this.message = 'BVN length should be 11'

        this.$toast.open({
          message: `<p class="toast-title">BVN Validation Message</p>
                    <p class="toast-msg"> ${this.message} </p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
        return true
      }
      return false
    },
    editProprietorFormHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      this.$emit('editProprietorFormHandler')
    },
    addProprietorFormHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      this.$emit('addProprietorFormHandler')
    },
    removeProprietorFormHandler() {
      this.$emit('removeProprietorFormHandler')
    },
    errorMessageHandler(message) {
      this.$toast.open({
        message: `<p class="toast-msg"> ${message}</p>`,
        type: 'error',
        duration: 4000,
        dismissible: true,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  p {
    a {
      font-size: 13px !important;
    }
  }
}
.button_container {
  display: flex;
  justify-content: space-between;
}
.surname {
  /* width: 66.9%;
  padding-left: 0 !important;
  border-left-color: transparent !important; */
  margin-left: -1px !important;
}
</style>
