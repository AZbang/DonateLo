<template>
  <div id="admin">
    <upload-image @uploadImage="uploadImage" v-show="!originBg"></upload-image>
    <div v-show="originBg">
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
  const UploadImage = require('./UploadImage.vue');
  const WidgetsControl = require('./WidgetsControl.vue');
  const ServicesControl = require('./ServicesControl.vue');

  module.exports = {
    components: {
       UploadImage,
       WidgetsControl,
       ServicesControl
    },
    data() {
      return {
        originBg: null,
        api: this.$root.api
      }
    },
    methods: {
      uploadImage(src) {
        canvas.getItemsByAttr('id', 'cover').forEach((i) => i.remove());
        this.originBg = src;

        fabric.Image.fromURL(src, (cover) => {
          cover.id = 'cover';
          cover.set('selectable', false);
          this.scale = window.innerWidth/cover.getWidth();
          cover.scale(this.scale);
          canvas.setHeight(cover.getHeight());
          canvas.add(cover);
        });
      }
    },
    mounted() {
      window.canvas = new fabric.Canvas('playground');
      canvas.setWidth(window.innerWidth);

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
