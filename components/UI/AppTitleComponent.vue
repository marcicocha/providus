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
//Default

h1 {
  font-family: 'GothamMedium', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 150%;
  margin-bottom: 10px;
  color: #2e434e;
}
p {
  font-family: 'GothamLight', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  color: #2e434e;
  letter-spacing: 1px;
}

// Dika's Entries

// h1 {
//   font-family: 'GothamMedium', sans-serif;
//   font-weight: 700;
//   font-size: 21px;
//   margin-bottom: 10px;
//   color: #2e434e;
//   line-height: 150%;
// }

// p {
//   font-family: 'GothamLight', sans-serif;
//   font-style: normal;
//   font-weight: bold;
//   letter-spacing: 1px;
//   font-size: 14px;
//   line-height: 150%;
//   color: #617580;
// }
</style>
