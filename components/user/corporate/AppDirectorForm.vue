<template>
  <div>
    <div class="columns is-gapless is-mobile">
      <div class="column is-4">
        <AppSelectHybrid
          v-model="directorDetailsObject.title"
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
          v-model="directorDetailsObject.surname"
          label="Surname"
          placeholder="Type Surname"
          is-text
        />
      </div>
    </div>
    <AppInput
      v-model="directorDetailsObject.firstName"
      label="First Name"
      placeholder="Type First Name"
      is-text
    />
    <AppInput
      v-model="directorDetailsObject.email"
      label="Email Address"
      placeholder="Enter Director's email address"
    />
    <AppInput
      v-model="directorDetailsObject.bvn"
      placeholder="Enter Director's Bank Verification Number"
      label="BVN"
      is-number
      max-length="11"
      min-length="11"
    />
    <div class="button_container">
      <p v-if="!isAddedToList">
        <a @click="addDirectorFormHandler"
          ><span class="icon"> <i class="fas fa-plus"></i> </span
        ></a>
      </p>
      <p v-if="isAddedToList">
        <a @click="editDirectorFormHandler"
          ><span class="icon"> <i class="fas fa-pen"></i> </span
        ></a>
      </p>
      <p v-if="isAddedToList">
        <a @click="removeDirectorFormHandler"
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
  name: 'AppDirectorForm',
  components: {
    AppInput,
    AppSelectHybrid,
  },
  props: {
    directorDetailsObject: {
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
        this.directorDetailsObject.title === '' ||
        this.directorDetailsObject.title === undefined
      ) {
        this.errorMessageHandler('Title')
        return true
      }
      if (
        this.directorDetailsObject.firstName === '' ||
        this.directorDetailsObject.firstName === undefined
      ) {
        this.errorMessageHandler('First Name')
        return true
      }
      if (
        this.directorDetailsObject.surname === '' ||
        this.directorDetailsObject.surname === undefined
      ) {
        this.errorMessageHandler('Surname')
        return true
      }
      if (
        this.directorDetailsObject.email === '' ||
        this.directorDetailsObject.email === undefined
      ) {
        this.errorMessageHandler('Email')
        return true
      }
      if (
        this.directorDetailsObject.bvn === '' ||
        this.directorDetailsObject.bvn === undefined
      ) {
        this.errorMessageHandler('BVN')
        return true
      }
      if (this.directorDetailsObject.bvn.length !== 11) {
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
    editDirectorFormHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      this.$emit('editDirectorFormHandler')
    },
    addDirectorFormHandler() {
      const validationResponse = this.validationHandler()
      if (validationResponse) {
        return
      }
      this.$emit('addDirectorFormHandler')
    },
    removeDirectorFormHandler() {
      this.$emit('removeDirectorFormHandler')
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
