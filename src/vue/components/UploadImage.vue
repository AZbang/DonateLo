<template>
  <input type="file" name="photo" class="select-image" @change="uploadImage">
</template>

<script>
  const utils = require('../../api/utils');

  module.exports = {
    methods: {
      uploadImage(e) {
        let files = e.target.files || e.dataTransfer.files;
        if(!files[0]) return;

        const isFormat = files[0].type === 'image/jpeg' || files[0].type === 'image/png';
        const isLt2M = files[0].size / 1024 / 1024 < 3;

        if(!isFormat) this.$store.dispatch('showLog', 'IMAGE_NOT_VALID_FORMAT');
        if(!isLt2M) this.$store.dispatch('showLog', 'IMAGE_LIMIT_SIZE');

        if(isFormat && isLt2M) {
          let reader = new FileReader();
          reader.onload = async (e) => {
            let img = await utils.loadResource(e.target.result);
            this.$emit('upload', img);
          }
          reader.readAsDataURL(files[0]);
        }
      }
    }
  }
</script>

<style>
  .select-image {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 10000;
    cursor: pointer;
  }
</style>
