<template>
  <div id="cover-control">
    <div style="height: inherit;" v-show="isCoverEditable">
      <canvas id="playground"></canvas>
    </div>

    <div class="cover-uploader-btn" v-show="isCoverEditable">
      <upload-image @upload="setCover"></upload-image>
      <el-button type="info" icon="el-icon-edit"></el-button>
    </div>

    <div class="cover-uploader-area" v-show="!isCoverEditable">
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
    computed: {
      isCoverEditable() {
        return this.$store.state.isCoverEditable;
      }
    },
    methods: {
      setCover(src) {
        this.$store.commit('setCover', src);
      }
    }
  }
</script>
