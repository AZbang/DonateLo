<template>
  <div id="app">
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  module.exports = {
    
  }
</script>

<style>
  body {
    background: #dfe3e6;
  }
  .vk-color {
    background: #5e81a8 !important;
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
