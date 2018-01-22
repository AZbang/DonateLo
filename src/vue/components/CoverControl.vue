<template>
  <div id="cover-control">
    <render v-show="isCoverExist"></render>

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
      UploadImage,
      Render
    },
    computed: {
      isCoverExist() {
        return this.$store.state.isCoverExist;
      }
    },
    methods: {
      setCover(img) {
        this.$store.commit('setCover', img);
        this.$store.commit('setCoverEditable', true);
      }
    }
  }
</script>
