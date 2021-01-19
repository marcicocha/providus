<template>
  <div>
    <AppTitleComponent heading="Next Step" />
    <div>
      <hr />
      <br />
      <p>
        Emails will be sent to your Company’s Directors and Signatories with a
        link to the web application where they’ll be required to complete a few
        steps using their mobile phones.
      </p>
      <p>
        Upon completion of those steps, you can continue the process using a
        Reference Code which will be sent to you.
      </p>

      <p>
        In the meantime, Please <a download>download</a> the following forms and
        send across to the relevant parties to complete and sign. You’ll have an
        option to upload them to complete the process later.
      </p>
    </div>
    <br />
    <AppButton title="Continue" @click="nextPageHandler" />
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
  methods: {
    nextPageHandler() {
      this.$router.replace('/user/corporate/necessity')
    },
  },
}
</script>
<style lang="scss" scoped>
p {
  font-family: 'GothamThin';
  font-size: 17px !important;
  margin-bottom: 30px !important;
  font-weight: bold;
  a {
    font-family: 'GothamLight';
    font-weight: bold;
  }
}
@media only screen and (max-width: 992px) {
  p {
    font-size: 16px !important;
  }
}
@media only screen and (max-width: 600px) {
  p {
    font-size: 14px !important;
  }
}
</style>
