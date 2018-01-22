<template>
  <div class="widget-editor">
    <el-button class="widget-editor__delete" type="danger" @click="deleteObject">Удалить виджет</el-button>
    <div class="widget-editor__content" :is="viewEditor"></div>
  </div>
</template>

<script>
  const EDITORS = require('../editors');

  module.exports = {
    methods: {
      deleteObject() {
        this.$store.dispatch('removeWidget', this.widget.id);
      }
    },
    computed: {
      widget() {
        return this.$store.state.editableObject;
      },
      viewEditor() {
        return EDITORS[this.widget.type];
      }
    }
  }
</script>
