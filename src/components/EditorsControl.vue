<template>
  <div :is="editorComponent"></div>
</template>

<script>
  const TextEditor = require('./TextEditor.vue');
  const LinearBarEditor = require('./LinearBarEditor.vue');
  const RadialBarEditor = require('./RadialBarEditor.vue');
  const ImageEditor = require('./ImageEditor.vue');

  module.exports = {
    components: {
      TextEditor,
      LinearBarEditor,
      RadialBarEditor,
      ImageEditor
    },
    props: ['editorType'],
    computed: {
      editorComponent() {
        return this.editorType + '-editor';
      }
    }
  }
</script>

<style lang="css">
</style>
