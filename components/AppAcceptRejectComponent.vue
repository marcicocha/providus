<template>
  <div>
    <h1>Reject Application</h1>
    <hr />
    <p>Select one or more reasons for rejecting this application</p>
    <div class="">
      <div class="column is-full">
        <label class="checkbox">
          <input type="checkbox" />
          Reason 2
        </label>
      </div>
      <div class="column is-full">
        <label class="checkbox">
          <input type="checkbox" />
          Reason 3
        </label>
      </div>
      <div class="column is-full">
        <label class="checkbox">
          <input type="checkbox" />
          Reason 4
        </label>
      </div>
      <div class="column is-full">
        <label class="checkbox">
          <input type="checkbox" />
          Reason 5
        </label>
      </div>
      <div class="column is-full">
        <label class="checkbox">
          <input type="checkbox" />
          Other
        </label>
      </div>
      <div class="column is-full">
        <div class="field">
          <div class="control">
            <textarea class="textarea" placeholder="Normal textarea"></textarea>
          </div>
        </div>
      </div>
      <div class="button-wrapper columns is-multiline">
        <div class="column">
          <AppButton
            class="custom-btn"
            title="Submit"
            style="padding: 15px; width: 100%"
          />
        </div>
        <div class="column">
          <AppButton
            class="custom-btn"
            title="Cancel"
            style="padding: 15px; width: 100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
label {
  display: block !important;
}
h1 {
  margin-bottom: 35px;
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: bold;
}
p {
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
}
.button-wrapper {
  margin-top: 10px;
}
</style>
