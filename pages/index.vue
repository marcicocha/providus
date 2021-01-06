<template>
  <div>
    <AppTitleComponent
      heading="Account Creation Web Portal"
      :description="description"
    />

    <AppButton title="GET STARTED" />
    <p>
      Have a Reference Number?<a
        ><nuxt-link to="/user/AppReference">Continue</nuxt-link></a
      >
    </p>
  </div>
</template>

<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppTitleComponent,
    AppButton,
  },
  data() {
    return {
      description:
        'Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here. Now let’s guide you through the process of creating your very own Future Forward Bank account.',
    }
  },
}
</script>
