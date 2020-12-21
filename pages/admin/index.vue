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
    </div>
  </div>
</template>

<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppInput from '@/components/UI/AppInput.vue'
export default {
  layout: 'adminSignUp',
  components: {
    AppTitleComponent,
    AppInput,
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
    daf() {
      console.log('daf', this.user)
    },
  },
}
</script>
