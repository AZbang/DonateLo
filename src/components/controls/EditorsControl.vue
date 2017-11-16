<template>
  <div :object="currentObject" :is="editorComponent"></div>
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
