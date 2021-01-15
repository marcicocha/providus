<template>
  <div style="margin-bottom: 15px">
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
<style lang="scss" scoped>
h1 {
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 150%;
  margin-bottom: 10px;
}
p {
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  color: #2e434e;
}
</style>
