<template>
  <div id="admin">
    <cover-control @toggleSize="toggleSize" @uploadImage="uploadImage" :isCoverEmpty="!!coverImage"></cover-control>

    <div v-show="coverImage">
      <canvas id="playground"></canvas>
    </div>

    <div class="controls-section">
      <p class="flow-text label">Добавить виджет:</p>
      <widgets-control></widgets-control>
    </div>

    <div class="controls-section">
      <p class="flow-text label">Добавить сервис:</p>
      <services-control></services-control>
    </div>
  </div>
</template>

<script>
  const CoverControl = require('./CoverControl.vue');
  const WidgetsControl = require('./WidgetsControl.vue');
  const ServicesControl = require('./ServicesControl.vue');

  module.exports = {
    components: {
      CoverControl,
      WidgetsControl,
      ServicesControl
    },
    data() {
      return {
        coverImage: null,
        api: this.$root.api
      }
    },
    methods: {
      resizeCoverToHeight() {
        this.scale = 300/this.originCoverHeight;
        this.coverImage.scale(this.scale);
        this.coverImage.left = window.innerWidth/2-this.coverImage.getWidth()/2;
        canvas.setHeight(300);
      },
      resizeCoverToWidth() {
        this.scale = window.innerWidth/this.originCoverWidth;
        this.coverImage.left = 0;
        this.coverImage.scale(this.scale);
        canvas.setHeight(this.coverImage.getHeight());
      },
      toggleSize(isFull) {
        if(isFull) this.resizeCoverToWidth();
        else this.resizeCoverToHeight();
      },
      uploadImage(src) {
        this.coverImage && this.coverImage.remove();

        fabric.Image.fromURL(src, (cover) => {
          this.coverImage = cover;
          this.originCoverWidth = cover.getWidth();
          this.originCoverHeight = cover.getHeight();
          this.resizeCoverToHeight();

          this.coverImage.id = 'cover';
          this.coverImage.set('selectable', false);
          canvas.add(this.coverImage);
        });
      }
    },
    mounted() {
      window.canvas = new fabric.Canvas('playground');
      canvas.setWidth(window.innerWidth);
      $('.canvas-container, canvas').css('transition', 'all 0.5s');

      // Get cover
      let covers = this.api.api_result.response[0].cover.images;
      if(covers.length) this.uploadImage(covers[covers.length-1].url);
    }
  }
</script>

<style scoped>
  .controls-section {
    margin-top: 50px;
    padding: 0 50px;
  }
  .controls-section .label {
    margin: 5px;
    color: #6e7bab;
  }
</style>
