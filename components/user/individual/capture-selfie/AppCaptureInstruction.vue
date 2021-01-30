<template>
  <div>
    <ul>
      <li>
        <div class="flex_display">
          <div><img src="@/assets/images/sun.svg" alt="sun" /></div>
          <p>Make sure you are in a well-lit area</p>
        </div>
      </li>
      <li>
        <div class="flex_display">
          <div><img src="@/assets/images/maximize.svg" alt="maximize" /></div>
          <p>You’re in front of a plain background</p>
        </div>
      </li>
      <li>
        <div class="flex_display">
          <div><img src="@/assets/images/meh.svg" alt="meh" /></div>
          <p>Keep your expression normal</p>
        </div>
      </li>
      <li>
        <div class="flex_display">
          <div><img src="@/assets/images/user-x.svg" alt="user-x" /></div>
          <p>
            Remove hats, thick glasses or anything else that hides your face
          </p>
        </div>
      </li>
    </ul>
    <AppButton title="Continue Capture" @click="captureInstructionHandler" />
  </div>
</template>
<script>
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'AppCaptureInstruction',
  components: {
    AppButton,
  },
  methods: {
    captureInstructionHandler() {
      this.$emit('captureInstructionHandler')
    },
  },
}
</script>
<style lang="scss" scoped>
ul {
  margin-bottom: 30px;
}
li {
  display: block;
  padding: 15px;
  border: 1px solid #eaeaea;
  border-top-color: transparent;
  width: 100%;
  height: 70px;
}
li:first-child {
  border-top-color: #eaeaea;
}
.flex_display {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  div {
    width: 15%;
    height: 100%;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    width: 85%;
    padding-left: 5px;
  }
}
@media only screen and (max-width: 991px) {
  .flex_display {
    div {
      width: 10%;
    }
    p {
      width: 90%;
      font-size: 12px;
      padding-left: 10px;
    }
  }
}
</style>
