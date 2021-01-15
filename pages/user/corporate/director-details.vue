<template>
  <div>
    <AppTitleComponent heading="Director Details" />
    <br />
    <div>
      <AppAccordion heading="Director">
        <template slot="content">
          <AppDirectorForm />
        </template>
      </AppAccordion>
    </div>
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppAccordion from '@/components/UI/AppAccordion.vue'
import AppDirectorForm from '@/components/user/corporate/director-details/AppDirectorForm.vue'
export default {
  components: {
    AppTitleComponent,
    AppAccordion,
    AppDirectorForm,
  },
}
</script>
