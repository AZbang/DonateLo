<template>
  <div :object="currentObject" :is="editorComponent"></div>
</template>

<script>
  const TextEditor = require('../editors/TextEditor.vue');
  const LinearBarEditor = require('../editors/LinearBarEditor.vue');
  const RadialBarEditor = require('../editors/RadialBarEditor.vue');
  const ImageEditor = require('../editors/ImageEditor.vue');

  module.exports = {
    components: {
      TextEditor,
      LinearBarEditor,
      RadialBarEditor,
      ImageEditor
    },
    props: ['currentObject'],
    computed: {
      editorComponent() {
        if(this.currentObject) return this.currentObject.type + '-editor';
        else '';
      }
    }
  }
</script>

<style lang="css">
</style>
