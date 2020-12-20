<template>
  <div>
    <h1>{{ heading }}</h1>
    <p v-if="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'AppTitleComponent',
  props: {
    heading: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
<style scoped>
h1 {
  color: red;
}
</style>
