<template>
  <div class="widget">
    <div class="widget__editor" :is="viewEditor"></div>
  </div>
</template>

<script>
  const EDITORS = require('../editors');

  module.exports = {
    methods: {
      deleteObject() {
        this.$store.dispatch('removeWidget', this.widget.id);
      },
      backToMenu() {
        this.$store.commit('setSection', 'WIDGETS');
      }
    },
    computed: {
      widget() {
        return this.$store.currentObject;
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
