<template>
  <div>
    <div v-loading="isLoading" :is="view"></div>
  </div>
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
        console.log(this.$store.state.currentView);
        return VIEWS[this.$store.state.currentView];
      },
      isLoading() {
        return this.$store.state.isLoading;
      }
    },
    mounted() {
      this.$store.dispatch('computedView');
    }
  }
</script>
