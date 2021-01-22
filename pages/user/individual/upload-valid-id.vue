<template>
  <div class="parent-container">
    <AppTitleComponent
      heading="Upload Valid Id"
      description="Please upload a valid means of Identification. Either International passport, Driver’s license, Permanent Voter’s card or National ID"
    />
    <br />
    <div>
      <AppSelect
        v-model="idObject.idType"
        label="Id Type"
        placeholder="Select Identification Type"
        url="/globalData/data?name=ID%20TYPE"
        :call-back-func="
          (resp) => ({
            text: resp,
            value: resp,
          })
        "
      />
      <button
        :class="{
          button: true,
          'is-fullwidth': true,
          'is-normal': true,
          'is-primary': true,
          'is-outlined': true,
        }"
        @click="capturePageHandler"
      >
        <span
          ><img src="@/assets/images/camera.svg" alt="camera" />
          <span>Capture with Camera</span></span
        >
      </button>
      <br />
      <h4>OR</h4>
      <AppUpload label="from Device" height="10em"
        ><template slot="caption">
          <ul class="caption_list">
            <li>ID must take up at least 80% of the image</li>
            <li>Resolution should be above 300 DPI</li>
            <li>Must be a Jpeg</li>
          </ul>
        </template>
      </AppUpload>
    </div>
  </div>
</template>
<script>
import AppTitleComponent from '@/components/UI/AppTitleComponent'
import AppSelect from '@/components/UI/AppSelect'
import AppUpload from '@/components/UI/AppUpload'
export default {
  components: {
    AppTitleComponent,
    AppSelect,
    AppUpload,
  },
  data() {
    return {
      idObject: {},
    }
  },
  methods: {
    capturePageHandler() {
      this.$router.replace('/user/individual/capture-id')
    },
  },
}
</script>
<style lang="scss" scoped>
.parent-container {
  width: 85%;
}
h4 {
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
  font-size: 14px;
}
h4::before,
h4::after {
  background-color: #eaeaea;
  content: '';
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 30%;
}
h4::before {
  right: 0.5em;
  margin-left: -50%;
}
h4::after {
  left: 0.5em;
  margin-right: -50%;
}
button {
  border: 1px solid #fdb813 !important;
  background-color: transparent !important;
  color: #fdb813 !important;
  border-radius: 0;
  font-size: 16px !important;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: bold;
}
.caption_list {
  margin-top: 20px;
  li {
    color: #828e95;
    font-weight: 400;
    margin-bottom: 5px;
  }
  li::before {
    content: '-';
    padding-right: 8px;
  }
}
@media only screen and (max-width: 991px) {
  button {
    font-size: 13px !important;
  }
  h4 {
    margin-bottom: 20px;
    font-size: 12px;
  }
  .parent-container {
    width: 100%;
  }
}
@media only screen and (max-width: 1200px) {
  .parent-container {
    width: 100%;
  }
}
</style>
