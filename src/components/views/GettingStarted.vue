<template>
  <div id="getting-started">
    <img class="responsive-img" src="dist/assets/banner.png">
    <div class="info container center">
      <h1 class="label">Что такое Donatelo?</h1>
      <p class="flow-text">Возможно, Вы когда-нибудь задумывались о динамической обложке для своей группы, но узнав о существующих решениях поняли, что это слишком сложно и дорого.</p>
      <p class="flow-text">Спешим Вас обрадовать! Donatelo поможет вам без особого труда и затрат самостоятельно создать динамическую обложку для вашей группы или паблика.</p>
      <a target="_blank" :href="'https://vk.com/add_community_app.php?aid=' + $parent.api.api_id" class="btn vk-color">Подключить приложение</a>
    </div>
    <br>
    <br>
    <img class="responsive-img" src="dist/assets/screen1.png">
    <div class="info container center">
      <h1 class="label">Виджеты</h1>
      <p class="flow-text">Donatelo обладает множеством виджетов для реализации вашего собственного дизайна обложки! </p>
      <p class="flow-text">Все что вам нужно - это расставлять различные визуальные элементы на вашу обложку и изменять стилистику. </p>
      <a target="_blank" :href="'https://vk.com/add_community_app.php?aid=' + $parent.api.api_id" class="btn vk-color">Подключить приложение</a>
    </div>
    <br>
    <br>
    <img class="responsive-img" src="dist/assets/screen2.png">
    <div class="info container center">
      <h1 class="label">Сервисы</h1>
      <p class="flow-text">Donatelo уже имеет множество различных интеграций с существующими сервисами: Последний подписчик, глосования, стастистика по сборам и многое другое. Сервисы легко подключаются в меню приложения и способны отображать необходимую информацию на обложке группы.</p>
      <p class="flow-text">Если вам не хватает существующих сервисов, то специально для разработчиков Donatelo предоставляет API для интеграции ваших сервисов с нешей платформой, например вы можете интегрировать показ актуальных новостей с вашего сайта, специальные промо акции, все ограничивается лишь вашей фантазией! </p>
      <a target="_blank" :href="'https://vk.com/add_community_app.php?aid=' + $parent.api.api_id" class="btn vk-color">Подключить приложение</a>
    </div>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
  module.exports = {
    mounted() {
      VK.External.resizeWindow(840, 3000);
    }
  }
</script>

<style scoped>
  .container {
    margin: 6% 0 6% 6%;
  }
  .banner {
    width: 100%;
    background-position: center;
    background-size: cover;
  }
  .info {
    font-size: 1.2em;
  }
  .label {
    font-size: 1.6em;
    font-weight: 500;
  }
  h1, p {
    color: #3d5977;
  }
</style>
