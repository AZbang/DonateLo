<template>
  <input type="file" name="photo" class="select-image" @change="uploadImage">
</template>

<script>
  module.exports = {
    methods: {
      uploadImage(e) {
        let file = e.target.files[0] || e.dataTransfer.files[0];

        const isFormat = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 3;

        if(!isFormat) this.$store.dispatch('showLog', 'IMAGE_NOT_VALID_FORMAT');
        if(!isLt2M) this.$store.dispatch('showLog', 'IMAGE_LIMIT_SIZE');

        if(isFormat && isLt2M) {
          let reader = new FileReader();
          reader.onload = (e) => this.$emit('upload', e.target.result);
          reader.readAsDataURL(file);
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
