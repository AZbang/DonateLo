<template>
  <div style="width: 100vw; height: 100vh;" v-loading="loading" :is="view"></div>
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
      this.$store.dispatch('computedView');
      console.log(this.$store.state.currentView)
    }
  }
</script>
