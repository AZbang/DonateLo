<template>
  <input type="file" class="select-image" @change="uploadImage">
</template>

<script>
  module.exports = {
    methods: {
      uploadImage(e) {
        let files = e.target.files || e.dataTransfer.files;
        if(!files.length) return;

        let reader = new FileReader();
        reader.onload = (e) => this.$emit('uploadImage', e.target.result, files[0]);
        reader.readAsDataURL(files[0]);
      }
    },
    mounted() {
      $('.select-image').parent().css('position', 'relative');
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
