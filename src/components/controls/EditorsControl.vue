<template>
  <div class="editor-wrap">
    <div class="btns-wrap" v-show="editorComponent">
      <a @click="deleteObject" class="btn-floating btn-large red waves-effect waves-light">
        <i class="material-icons">delete</i>
      </a>
      <a @click="backToMenu" class="btn-floating btn-large green waves-effect waves-light">
        <i class="material-icons">done</i>
      </a>
    </div>
    <div :object="currentObject" :is="editorComponent"></div>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
  const TextEditor = require('../editors/TextEditor.vue');
  const LinearEditor = require('../editors/LinearBarEditor.vue');
  const RadialEditor = require('../editors/RadialBarEditor.vue');
  const ImageEditor = require('../editors/ImageEditor.vue');

  module.exports = {
    components: {
      TextEditor,
      LinearEditor,
      RadialEditor,
      ImageEditor
    },
    props: ['renderer', 'currentObject'],
    methods: {
      deleteObject() {
        this.renderer.canvas.trigger('selection:cleared');
        this.renderer.removeWidget(this.currentObject.id);
      },
      backToMenu() {
        this.renderer.canvas.trigger('selection:cleared');
      }
    },
    computed: {
      editorComponent() {
        if(this.currentObject) return this.currentObject.type + '-editor';
        else '';
      }
    }
  }
</script>

<style scoped>
  .editor-wrap {
    position: relative;
  }
  .btns-wrap {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1000;
  }
  a {
    margin-left: 10px;
    width: 60px;
    height: 60px;
  }
  a i {
    line-height: 62px;
    font-size: 35px;
  }
</style>
