<template>
  <div>
    <AppTitleComponent heading="What you'll need" />
    <div>
      <hr />
      <br />
      <div>
        <ol type="a">
          <li>
            Duly completed <a download>Mandate</a> Card with photo and signature
            of all signatories
          </li>
          <li>Scanned copy of the <a download>Board Resolution</a></li>
          <li>
            Scanned copies of Company Registration documents (Certificate of
            Incorporation/Registration, CAC2, CAC7 and Memart)
          </li>
          <li>
            Scanned copies of the ID cards of Directors and Signatories (OCR is
            carried out to confirm name and picture on ID)
          </li>
          <li>Scanned copy of Tax ID registration</li>
          <li>
            Scanned copy of Utility bill for Registered/Business address
            (Optional)
          </li>
        </ol>
      </div>
    </div>
    <br />
    <AppButton title="Save and Edit" @click="nextPageHandler" />
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'

export default {
  components: {
    AppTitleComponent,
  },
  methods: {
    nextPageHandler() {
      this.$router.replace('/user/corporate/capture-selfie')
    },
  },
}
</script>
<style lang="scss" scoped>
li {
  font-family: 'GothamThin';
  font-size: 17px !important;
  margin-bottom: 15px !important;
  font-weight: bold;
  a {
    font-family: 'GothamLight';
    font-weight: bold;
  }
}
@media only screen and (max-width: 992px) {
  li {
    font-size: 16px !important;
  }
}
@media only screen and (max-width: 600px) {
  li {
    font-size: 14px !important;
  }
}
</style>
