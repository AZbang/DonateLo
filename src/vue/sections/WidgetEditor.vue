<template>
  <div class="widget-editor">
    <el-button class="widget-editor__main-btn" type="danger" @click="deleteObject">Удалить виджет</el-button>
    <div class="widget-editor__content" :is="viewEditor"></div>
  </div>
</template>

<script>
  const EDITORS = require('../editors');

  module.exports = {
    methods: {
      deleteObject() {
        console.log(this.widget);
        this.$store.dispatch('removeWidget', this.widget.id);
      },
      backToMenu() {
        this.$store.commit('setSection', 'WIDGETS');
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
