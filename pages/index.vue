<template>
  <div class="parent_container">
    <AppTitleComponent
      heading="Account Creation Web Portal"
      :description="description"
    />

    <div class="child-container">
      <div class="homepage_button__padding">
        <nuxt-link
          to="/user/individual/account-type-selection"
          class="button is-medium is-primary"
          ><span>GET STARTED</span></nuxt-link
        >
      </div>

      <p class="reference">
        Have a Reference Number?
        <a class="bold"><nuxt-link to="/user/reference">Continue</nuxt-link></a>
      </p>
    </div>
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
<style scoped>
.bold,
.bold * {
  font-weight: 700 !important;
  font-family: 'GothamMedium', sans-serif;
}
p {
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 150%;
  color: #2e434e;
  text-align: center;
  padding-top: 25px;
}
.reference {
  text-align: left;

  /* font-size: 14px; */
}
.homepage_button__padding {
  padding-top: 50px;
}
.parent_container {
  width: 85%;
  height: 100%;
  position: relative;
  top: 19%;
}
.child-container {
  width: 75%;
}
.button {
  width: 100%;
  border-radius: 0;
  font-size: 15px !important;
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: 400;
  color: #fff !important;
}
</style>
