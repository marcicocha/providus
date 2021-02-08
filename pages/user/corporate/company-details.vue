<template>
  <div>
    <AppTitleComponent heading="Company Details" />
    <AppCompanyForm />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppCompanyForm from '@/components/user/corporate/AppCompanyForm'
export default {
  components: {
    AppTitleComponent,
    AppCompanyForm,
  },
}
</script>
