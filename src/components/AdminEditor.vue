<template>
  <div id="admin">
    <cover-control @toggleSize="toggleSize" @uploadImage="uploadImage" :isCoverEmpty="!coverImage"></cover-control>

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
        this.coverImage.animate('scaleX', this.scale, this.animateParams);
        this.coverImage.animate('scaleY', this.scale, this.animateParams);
        this.coverImage.animate('left', window.innerWidth/2-this.originCoverWidth*this.scale/2, this.animateParams);
        $('.canvas-container').css('height', '300px');
      },
      resizeCoverToWidth() {
        this.scale = window.innerWidth/this.originCoverWidth;
        this.coverImage.animate('scaleX', this.scale, this.animateParams);
        this.coverImage.animate('scaleY', this.scale, this.animateParams);
        this.coverImage.animate('left', 0, this.animateParams);
        $('.canvas-container').css('height', this.originCoverHeight*this.scale + 'px');
      },
      toggleSize(isFull) {
        if(isFull) this.resizeCoverToWidth();
        else this.resizeCoverToHeight();
        // 
        // let left = -this.coverImage.left;
        // let top = -this.coverImage.top;
        // let width = 1590;
        // let height = 400;
        //
        // this.coverImage.clipTo = (ctx) => {
        //   ctx.rect(-(1590/2)+left, -(400/2)+top, parseInt(width*this.scale), parseInt(this.scale*height));
        // }
        // canvas.renderAll();
      },
      uploadImage(src) {
        this.coverImage && this.coverImage.remove();

        fabric.Image.fromURL(src, (cover) => {
          this.coverImage = cover;
          this.coverImage.id = 'cover';
          this.coverImage.set('selectable', false);
          this.coverImage.top = 0;
          this.coverImage.left = 0;

          this.originCoverWidth = cover.getWidth();
          this.originCoverHeight = cover.getHeight();
          this.toggleSize(true);

          canvas.add(this.coverImage);
        });
      }
    },
    mounted() {
      window.canvas = new fabric.Canvas('playground');
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(300);

      $('.canvas-container').css('transition', 'all 0.5s');
      this.animateParams = {
        duration: 500,
        easing: fabric.util.ease['easeInQuad'],
        onChange: canvas.renderAll.bind(canvas)
      }
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
