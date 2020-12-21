<template>
  <div>
    <AppTitleComponent heading="Sign In" :description="description" />
  </div>
</template>

<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
export default {
  layout: 'adminSignUp',
  components: {
    AppTitleComponent,
  },
  data() {
    return {
      description:
        'Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here.',
    }
  },
}
</script>
