<template>
  <div style="width: 100vw; height: 100vh;" v-loading="loading" :is="view"></div>
</template>

<script>
  const axios = require('axios');
  const VIEWS = {
    Admin: require('./views/AdminEditor.vue'),
    GettingStarted: require('./views/GettingStarted.vue'),
    Register: require('./views/Register.vue')
  }

  module.exports = {
    computed: {
      view() {
        return VIEWS[this.$store.state.currentView];
      },
      loading() {
        return this.$store.state.loading;
      }
    },
    mounted() {
      this.$store.dispatch('computedView');
    }
  }
</script>
