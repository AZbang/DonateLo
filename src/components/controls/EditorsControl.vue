<template>
  <div>
    <div :object="currentObject" :is="editorComponent"></div>
    <div class="fixed-bottom row">
      <div class="input-field col s6">
        <button class="btn delete-btn waves-effect btn-flat red lighten-1" @click="deleteObject">Удалить</button>
      </div>
      <div class="input-field col s6">
        <button class="btn okey-btn waves-effect btn-flat green lighten-1" @click="backToMenu">Вернуться</button>
      </div>
    </div>
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
        this.renderer.removeWidget(this.currentObject.id);
      },
      backToMenu() {
        this.currentObject.view.trigger('mouseup');
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
  .fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 10px 0;
    background-color: #fff;
    z-index: 1000;
    margin: 0;
  }
  .fixed-bottom .input-field {
    margin: 0;
  }
  .btn {
    color: #fff;
    height: 100%;
    width: 100%;
  }
</style>
