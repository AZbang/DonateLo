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
        canvas.setHeight(300);
      },
      resizeCoverToWidth() {
        this.scale = window.innerWidth/this.originCoverWidth;
        this.coverImage.animate('scaleX', this.scale, this.animateParams);
        this.coverImage.animate('scaleY', this.scale, {
          ...this.animateParams,
          onComplete: () => {
            canvas.setHeight(this.originCoverHeight*this.scale);
          }
        });

        this.coverImage.animate('left', 0, this.animateParams);
        $('.canvas-container').css('height', this.originCoverHeight*this.scale + 'px');
      },
      toggleSize(isFull) {
        if(isFull) this.resizeCoverToWidth();
        else this.resizeCoverToHeight();
      },
      uploadImage(base64) {
        fabric.Image.fromURL(base64, (texture) => {
          texture.setCrossOrigin('anonymous');
          let scale = 1590/texture.getWidth();
          let w = 1590/scale;
          let h = 400/scale;

          let coverSrc = texture.toDataURL({
            left: texture.getWidth()/2-w/2,
            top:  texture.getHeight()/2-h/2,
            width: w,
            height: h
          });

          this.setCover(coverSrc);
        });
      },
      setCover(src) {
        this.coverImage && this.coverImage.remove();

        fabric.Image.fromURL(src, (cover) => {
          this.coverImage = cover;
          this.coverImage.id = 'cover';
          this.coverImage.set('selectable', false);

          this.originCoverWidth = cover.getWidth();
          this.originCoverHeight = cover.getHeight();
          this.resizeCoverToHeight();

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
      if(covers.length) this.setCover(covers[covers.length-1].url);
    }
  }
</script>

<style scoped>
  .controls-section {
    margin-top: 2em;
    padding: 0 1em;
  }
  .controls-section .label {
    margin: 5px;
    color: #6e7bab;
  }
</style>
