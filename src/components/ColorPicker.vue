<template>
  <div class="colors">
    <div class="color" v-for="(color, index) in colors" :style="{backgroundColor: color}">
      <i class="material-icons" v-show="selectColor == index">done</i>
    </div>
  </div>
   <!-- <slider-picker v-model="colors" @input="updateColor"/> -->
</template>

<script>
  const SliderPicker = require('vue-color/dist/vue-color.min.js').Slider;

  module.exports = {
    components: {
      SliderPicker
    },
    data() {
      return {
        colors: ["#ff4836", "#ff8c41", "#fcd900", "#2cca90", "#48dfda", "#5ac4ec", "#456cad", "#707dc3", "#959ca4", "#c8cad7"],
        selectColor: 0
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
  .colors {
    overflow: hidden;
    margin: auto;
  }
  .color {
    float: left;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  .color i {
    font-size: 2.5em;
    font-weight: 800;
    color: #fff;
    margin: 7px;
  }
</style>
