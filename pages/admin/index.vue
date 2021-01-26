<template>
  <div>
    <AppTitleComponent heading="Sign In" :description="description" />
    <hr />
    <div class="columns is-multiline">
      <div class="column is-full">
        <AppInput
          v-model="user"
          label="Username"
          placeholder="Enter Your Username"
          @blur="daf"
        />
      </div>
      <div class="column is-full">
        <AppInput
          v-model="password"
          label="password"
          placeholder="Enter Your Password"
        />
      </div>
      <div class="column is-full">
        <AppButton title="Sign In" style="padding: 30px" @click="logIn" />
      </div>
    </div>
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppInput from '@/components/UI/AppInput.vue'
import AppButton from '@/components/UI/AppButton.vue'
export default {
  layout: 'adminSignUp',
  components: {
    AppTitleComponent,
    AppInput,
    AppButton,
  },
  data() {
    return {
      user: '',
      password: '',
      description:
        'Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here.',
    }
  },
  methods: {
    daf() {},
    logIn() {
      this.$router.push('admin/usermangement')
    },
  },
}
</script>
