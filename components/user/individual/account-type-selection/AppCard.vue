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
  height: 150px;
  cursor: pointer;
  border: 1.5px solid #eaeaea;
  box-sizing: border-box;
  padding: 40px;
  p {
    margin-top: 20px;
    font-size: 14px;
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
@media only screen and (max-width: 321px) {
  .card {
    padding: 20px;
  }
}

@media only screen and (max-width: 767px) {
  .card {
    height: 150px;
    p {
      margin-top: 20px;
      font-size: 15px;
      font-family: 'GothamLight', sans-serif;
      font-weight: bold;
    }
  }
}
@media only screen and (min-width: 1025px) {
  .reference {
    font-size: 13px !important;
  }
  p {
    font-size: 13px;
  }
  .card {
    height: 150px;
    p {
      margin-top: 20px;
      font-size: 14px;
      font-family: 'GothamLight', sans-serif;
      font-weight: bold;
    }
  }
}
@media only screen and (min-width: 1536px) {
  .card {
    height: 200px;
    p {
      margin-top: 20px;
      font-size: 17px;
      font-family: 'GothamLight', sans-serif;
      font-weight: bold;
    }
  }
  @media only screen and (min-height: 730px) {
    .card {
      height: 180px;
      p {
        margin-top: 20px;
        font-size: 15px;
        font-family: 'GothamLight', sans-serif;
        font-weight: bold;
      }
    }
  }
  @media only screen and (min-height: 900px) {
    .card {
      height: 200px;
      p {
        margin-top: 20px;
        font-size: 17px;
        font-family: 'GothamLight', sans-serif;
        font-weight: bold;
      }
    }
  }
}
</style>
