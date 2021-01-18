<template>
  <div class="full-input">
    <div class="file">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" />
        <span class="file-cta">
          <span class="file-icon">
            <img src="@/assets/images/upload.svg" alt="upload icon" />
          </span>
          <span class="file-label"> Upload {{ label }}</span>
        </span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppUpload',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.file-cta {
  background-color: transparent;
  color: #4a4a4a;
  width: 100% !important;
  border: 1px dashed #dcdcdc !important;
  border-radius: 0;
  height: 4.5em;
}
.file-label {
  width: 100%;
}
.file-icon {
  width: 2em;
}
label {
  opacity: 1;
  display: block;
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #2e434e;
  padding: 2px 1px;
  width: 100%;
}
.full-input {
  margin-bottom: 5px;
}
</style>
