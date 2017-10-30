<template>
  <div class="container">
    <h1 class="label">Что такое Donatelo?</h1>
    <p class="flow-text">Возможно когда-то Вы задумывались о динамической обложки для своей группы, но узнав о существующих решениях поняли, что это слишком сложно и не стоит того.</p>
    <p class="flow-text">Спешим Вас обрадовать! Donatelo поможет вам без особого труда и затрат самостоятельно сделать динамическую обложку для своей группы или паблика.</p>
    <p class="flow-text">Описание особенностей с картиночками.</p>
    <a target="_blank" :href="'https://vk.com/add_community_app.php?aid=' + api.api_id" class="btn vk-color">Подключить приложение</a>
  </div>
</template>

<script>
  module.exports = {
    props: ['api']
  }
</script>

<style scoped>
  .container {
    margin-top: 10%;
  }
  h1, p {
    color: #3d5977;
  }
</style>
