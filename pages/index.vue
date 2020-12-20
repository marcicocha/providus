<template>
  <div>
    <AppTitleComponent
      heading="Account Creation Web Portal"
      :description="description"
    />
  </div>
</template>

<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
export default {
  components: {
    AppTitleComponent,
  },
  data() {
    return {
      description:
        'Welcome to Future Forward Banking. We believe that the New World of fast, smart, personal and borderless banking relationship is here. Now let’s guide you through the process of creating your very own Future Forward Bank account.',
    }
  },
}
</script>
