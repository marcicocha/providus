<template>
  <div>
    <AppTitleComponent heading="Director Details" />
    <div>
      <AppAccordion
        v-for="(item, index) in directorList"
        :key="index"
        :heading="`Director ${index + 1}`"
        :init-is-true="false"
      >
        <template slot="content">
          <AppDirectorForm
            :director-details-object="item"
            :is-added-to-list="true"
            @editDirectorFormHandler="editDirectorFormHandler(item)"
            @removeDirectorFormHandler="removeDirectorFormHandler(item)"
          />
        </template>
      </AppAccordion>
      <AppDirectorForm
        v-if="directorList.length < 5"
        :director-details-object="directorDetailsObject"
        @addDirectorFormHandler="addDirectorFormHandler"
      />
    </div>
    <br />
    <AppButton
      v-if="directorList.length !== 0"
      title="Continue"
      :loading="loading"
      @click="submitDirectorHandler"
    />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppAccordion from '@/components/UI/AppAccordion.vue'
import AppDirectorForm from '@/components/user/corporate/AppDirectorForm.vue'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppAccordion,
    AppDirectorForm,
    AppButton,
  },
  data() {
    return {
      directorList: [],
      directorDetailsObject: {},
      loading: false,
    }
  },
  methods: {
    async submitDirectorHandler() {
      try {
        this.loading = true
        await this.$axios.$put('/corporate/directorDetails', this.directorList)
        this.loading = false
        this.$router.replace('/user/corporate/proprietor-details')
      } catch (err) {
        this.loading = false
        this.message = err.response.data.errorMessage
        let errorMessage = 'Network Error'
        // eslint-disable-next-line no-prototype-builtins
        if (err.hasOwnProperty('response')) {
          const res = err.response
          errorMessage = res.data.errorMessage
          const validationError = res.data.fieldValidationErrors
            ? res.data.fieldValidationErrors
            : []
          if (validationError === [] || !validationError) {
            this.$toast.open({
              message: `<p class="toast-msg"> ${errorMessage} </p>`,
              type: 'error',
              duration: 4000,
              dismissible: true,
            })
            return
          }
          validationError.forEach((element) => {
            this.$toast.open({
              message: `<p class="toast-msg"> ${element.message} </p>`,
              type: 'error',
              duration: 4000,
              dismissible: true,
            })
          })
        }
      }
    },
    editDirectorFormHandler(obj, index) {
      this.directorList = this.directorList.map((director) => {
        return director.key === obj.key ? obj : director
      })
    },
    addDirectorFormHandler() {
      if (this.directorList.length <= 5) {
        const requestId = this.$cookies.get('requestId')
        const obj = {
          ...this.directorDetailsObject,
          requestId,
          key: Date.now(),
        }
        this.directorList.push(obj)
      } else {
        this.$toast.open({
          message: `<p class="toast-msg"> Only 5 Directors can be added</p>`,
          type: 'error',
          duration: 4000,
          dismissible: true,
        })
        return
      }
      this.directorDetailsObject = {}
    },
    removeDirectorFormHandler(obj) {
      const newArray = this.directorList.filter(
        (director) => director.key !== obj.key
      )
      this.directorList = newArray
    },
  },
}
</script>
