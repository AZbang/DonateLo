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
        return VIEWS[this.$store.state.currentView]
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

<style lang="css">
  ::-webkit-scrollbar-track {
  	border-radius: 10px;
  	background-color: #edeef0;
  }
  ::-webkit-scrollbar {
  	width: 8px;
  	background-color: #edeef0;
  }
  ::-webkit-scrollbar-thumb {
  	background-color: #6e7cac;
  }

  body {
    overflow-x: hidden;
    background-color: #fff;
    width: 100vw;
    height: 100vh;
  }

  .vk-color {
    box-shadow: none;
    background: #5e81a8 !important;
  }
  .label {
    font-weight: 300;
    margin-top: 10px;
  }
</style>
