<template>
  <div id="cover-control">
    <div class="actions-wrap" @mouseover="toggleBtnActions(true)" @mouseout="toggleBtnActions(false)">
      <div id="new-cover" class="btn-cover">
        <upload-image @uploadImage="uploadImage"></upload-image>
        <i class="material-icons">edit</i>
      </div>
      <div id="resize-cover" class="btn-cover" @click="toggleSize">
        <i class="material-icons">fullscreen</i>
      </div>
    </div>

    <div id="first-upload-bg" v-show="!isCoverEmpty">
      <upload-image @uploadImage="uploadImage"></upload-image>
      <i class="material-icons">add_a_photo</i><br>
      <p class="flow-text">Загрузите обложку группы</p>
    </div>
  </div>
</template>

<script>
  const UploadImage = require('./UploadImage.vue');

  module.exports = {
    components: {
      UploadImage
    },
    props: ['isCoverEmpty'],
    data() {
      return {
        isFullCover: false
      }
    },
    methods: {
      toggleBtnActions(toggle) {
        if(toggle) $('.btn-cover').show();
        else $('.btn-cover').hide();
      },
      toggleSize() {
        this.isFullCover = !this.isFullCover;
        this.$emit('toggleSize', this.isFullCover);
      },
      uploadImage(src) {
        this.$emit('uploadImage', src);
      }
    }
  }
</script>

<style scoped>
  #first-upload-bg {
    height: 300px;
    border: 5px dashed #7a9ee0;
    width: 100%;
    text-align: center;
    padding-top: 110px;
    position: relative;
    box-sizing: border-box;
  }
  #first-upload-bg i, #first-upload-bg p {
    color: #7a9ee0;
    margin-top: 0;
    text-align: center;
  }
  #first-upload-bg i {
    font-size: 3em;
  }

  .actions-wrap {
    z-index: 10000;
    width: 200px;
    height: 200px;
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .btn-cover {
    padding: 9px;
    width: 44px;
    height: 44px;
    margin-left: 8px;
    color: #fff;
    background: rgba(31,31,31,.75);
    border-radius: 3px;
    float: right;
    cursor: pointer;
  }
</style>
