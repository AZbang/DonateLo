<template>
  <div style="width: 100vw;" v-loading="loading" :is="view"></div>
</template>

<script>
  module.exports = {
    computed: {
      view() {
        return this.$store.getters.view;
      },
      loading() {
        return this.$store.state.loading;
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
