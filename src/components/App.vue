<template>
  <div id="app">
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  module.exports = {
    mounted() {
      let api = this.$route.query;
      if(api.viewer_type > 2) this.$router.push('/admin');
      else this.$router.push('/getting_started');
    }
  }
</script>

<style>
  body {
    background: #dfe3e6;
  }
  .vk-color {
    background: #5e81a8 !important;
  }
  .label {
    font-weight: 200;
    margin-top: 10px;
  }


  .slide-leave-active,
  .slide-enter-active {
    transition: .4s;
  }
  .slide-enter {
    transform: translate(100%, 0);
  }
  .slide-leave-to {
    transform: translate(-100%, 0);
  }
</style>
