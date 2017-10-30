<template>
  <div id="admin">
    <div id="edit_bg" style="{backgroundImage: 'url(' + originBg + ');'}"></div>
    <div class="container">
      <h1>Donatelo</h1>
    </div>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        originBg: ''
      }
    },
    methods: {

    }
  }
</script>

<style>
  #edit_bg {
    width: 100vw;
    height: 400px;
    background-size: cover;
    background-position: center;
  }
</style>
