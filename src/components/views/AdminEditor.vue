<template>
  <div id="admin">
    <div class="fixed-wrap">
      <cover-control @toggleSize="toggleSize" @uploadImage="uploadImage" :isCoverEmpty="!coverImage"></cover-control>

      <div v-show="coverImage">
        <canvas id="playground"></canvas>
      </div>

      <ul id="menu" class="tabs">
        <li class="tab col s4"><a href="#add" class="active">Добавить</a></li>
        <li class="tab col s4"><a href="#edit">Изменить</a></li>
        <li class="tab col s4"><a href="#settings">Настройки</a></li>
        <div class="indicator"></div>
      </ul>
    </div>
    <div class="views-wrap">
      <div id="add">
        <div class="controls-section">
          <p class="flow-text label">Добавить виджет:</p>
          <widgets-control></widgets-control>
        </div>

        <div class="controls-section">
          <p class="flow-text label">Добавить сервис:</p>
          <services-control></services-control>
        </div>
      </div>
      <div id="edit">
        <div class="controls-section">
          <editors-control :editorType="'linear-bar'"></editors-control>
        </div>
      </div>
      <div id="settings">
        <div class="controls-section">
          <p class="flow-text label">Настройки</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const CoverControl = require('../controls/CoverControl.vue');
  const WidgetsControl = require('../controls/WidgetsControl.vue');
  const ServicesControl = require('../controls/ServicesControl.vue');
  const EditorsControl = require('../controls/EditorsControl.vue');

  module.exports = {
    components: {
      CoverControl,
      WidgetsControl,
      ServicesControl,
      EditorsControl
    },
    data() {
      return {
        coverImage: null,
        api: this.$parent.api
      }
    },
    methods: {
      resizeCoverToHeight() {
        this.scale = 300/this.originCoverHeight;
        this.coverImage.animate('scaleX', this.scale, this.animateParams);
        this.coverImage.animate('scaleY', this.scale, this.animateParams);
        this.coverImage.animate('left', window.innerWidth/2-this.originCoverWidth*this.scale/2, this.animateParams);
        $('.canvas-container').css('height', '300px');
        $('.views-wrap').css('margin-top', '348px');

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
        $('.views-wrap').css('margin-top', this.originCoverHeight*this.scale+48 + 'px');

      },
      toggleSize(isFull) {
        if(isFull) this.resizeCoverToWidth();
        else this.resizeCoverToHeight();
      },
      uploadImage(base64) {
        fabric.Image.fromURL(base64, (texture) => {
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

      $('ul.tabs').tabs();

      $('.canvas-container').css('transition', 'all 1s');
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
  .fixed-wrap {
    position: fixed;
    top: 0;
    z-index: 10000;
  }
  .views-wrap {
    margin-top: 348px;
  }
  .controls-section {
    padding: 2em 1em 0;
  }
  .controls-section .label {
    margin: 5px;
    color: #6e7bab;
  }
  .tabs {
    overflow: hidden;
    z-index: 100000;
  }
  .tab a {
    color: #6e7bab !important;
  }
  .tab a.active {
    color: #6e7bab !important;
  }
  .tabs .indicator {
    background-color: #6e7bab !important;
  }
</style>
