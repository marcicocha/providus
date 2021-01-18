<template>
  <div class="child-container">
    <div style="margin-top: -15px; width: 70%">
      <div>
        <img src="@/assets/images/fire-cracker.svg" />
      </div>
      <h1>Well Done {{ name }}</h1>
      <p>We’ll get back to you with details of your account in 72 Hours</p>
      <AppButton title="Save and Exit" @click="saveHandler" />
    </div>
  </div>
</template>
<script>
import AppButton from '@/components/UI/AppButton'
export default {
  components: {
    AppButton,
  },
  data() {
    return {
      name: 'David',
    }
  },
  methods: {
    saveHandler() {
      this.$router.replace('/')
    },
  },
}
</script>
<style lang="scss" scoped>
.child-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 150%;
  margin-bottom: 15px;
  color: #2e434e;
  margin-top: 30px;
}
p {
  font-family: 'GothamThin', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  color: #2e434e;
  letter-spacing: 1px;
  margin-bottom: 30px;
}
</style>
