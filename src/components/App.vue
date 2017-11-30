<template>
  <div v-loading="isLoading" :is="view"></div>
</template>

<script>
  const axios = require('axios');
  const VIEWS = {
    'Admin': require('./views/AdminEditor.vue'),
    'GettingStarted': require('./views/GettingStarted.vue'),
    'Register': require('./views/Register.vue')
  }

  module.exports = {
    computed: {
      view() {
        return VIEWS[this.$store.state.currentView];
      },
      isLoading() {
        return this.$store.state.isLoading;
      }
    },
    mounted() {
      console.log(VK);
      this.$store.dispatch('computedView');
    }
  }
</script>

<style>
  body {
    overflow: hidden;
  }
</style>
