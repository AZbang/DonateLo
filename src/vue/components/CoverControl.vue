<template>
  <div id="cover-control">
    <div v-html="canvas" v-show="isCoverExist" style="height: inherit;"></div>

    <div class="cover-uploader-btn" v-show="isCoverExist">
      <upload-image @upload="setCover"></upload-image>
      <el-button type="info" icon="el-icon-edit"></el-button>
    </div>

    <div class="cover-uploader-area" v-show="!isCoverExist">
      <upload-image @upload="setCover"></upload-image>
      <i class="el-icon-picture cover-uploader-area__icon"></i>
      <p class="cover-uploader-area__text">Загрузите обложку для редактирования</p>
    </div>
  </div>
</template>

<script>
  const UploadImage = require('./UploadImage.vue');

  module.exports = {
    components: {
      UploadImage
    },
    data() {
      return {
        width: 1000,
        height: 300
      }
    }
    computed: {
      isCoverExist() {
        return this.$store.state.isCoverExist;
      },
      coverImage() {
        return this.$store.state.coverImage;
      },
      render() {
        return this.$store.state.render;
      }
    },
    methods: {
      setCover(img) {
        this.$store.commit('setCover', img);
        this.$store.commit('setCoverEditable', true);
      },
      resizeToWidth() {
        let scale = this.width/this.coverImage.coverWidth;
        let container = document.getElementsByClassName('canvas-container')[0];
        this.canvas.style.transform = 'scale(' + scale + ')';
        this.canvas.style.transformOrigin = '0 0';
        this.canvas.parentNode.style.height = this.coverImage.coverHeight*scale + 'px';
      }
    }
  }
</script>
