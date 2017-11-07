<template>
   <slider-picker v-model="colors" @input="updateColor"/>
</template>

<script>
  const SliderPicker = require('vue-color/dist/vue-color.min.js').Slider;

  module.exports = {
    components: {
      SliderPicker
    },
    data() {
      return {
        colors: []
      }
    },
    methods: {
      updateColor() {

      }
    },
    mounted() {
    }
  }
</script>

<style lang="css">
  .vc-slider {
    width: 100% !important;
  }
</style>
