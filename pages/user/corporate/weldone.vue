<template>
  <div>
    <div>
      <div>
        <img src="@/assets/images/fire-cracker.svg" />
      </div>
      <h2>Well Done {{ name }}</h2>
      <p>We’ll get back to you with details of your account in 72 Hours</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'David',
    }
  },
}
</script>
