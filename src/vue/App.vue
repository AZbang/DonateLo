<template>
  <div style="width: 100vw;" v-loading="loading" :is="view"></div>
</template>

<script>
  module.exports = {
    computed: {
      view() {
        return this.$store.state.currentView;
      },
      loading() {
        return this.$store.state.loading;
      }
    },
    mounted() {
      // Похоже ВК не оставляет мне выбора... Неееееет.
      setInterval(() => {
        VK.External.resizeWindow(1000, document.body.clientHeight+50);
      }, 100);

      this.$store.dispatch('computedView');
    }
  }
</script>
