<template>
  <div style="width: 100vw;" v-loading="loading" :is="view"></div>
</template>

<script>
  const VIEWS = require('./views');

  module.exports = {
    computed: {
      loading() {
        return this.$store.state.loading;
      },
      view() {
        return VIEWS[this.$store.getters.view];
      }
    },
    mounted() {
      this.$store.dispatch('computedView');
      setInterval(() => {
        VK.External.resizeWindow(1000, document.body.clientHeight+50);
      }, 100);
    }
  }
</script>
