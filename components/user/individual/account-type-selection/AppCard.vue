<template>
  <div class="card" @click="$emit('onClickHandler', cardData.description)">
    <img :src="getImgUrl(cardData.imageSrc)" :alt="cardData.text" />
    <p>{{ cardData.description }}</p>
  </div>
</template>
<script>
export default {
  name: 'AppCard',
  props: {
    cardData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getImgUrl(pic) {
      return require('~/assets/images/' + pic)
    },
  },
}
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 200px;
  cursor: pointer;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  p {
    margin-top: 20px;
    font-size: 17px;
    font-family: 'GothamLight', sans-serif;
    font-weight: bold;
  }
}
.card:hover,
.card:focus {
  border: 2px solid #fdb813;
  background: rgba(253, 184, 19, 0.05);
  img {
    filter: invert(59%) sepia(99%) saturate(391%) hue-rotate(2deg)
      brightness(105%) contrast(99%);
  }
}
</style>
