<template>
  <div id="getting-started">
    <img class="responsive-img" src="assets/banner.png">
    <div class="info container center">
      <h1 class="label">Что такое Donatelo?</h1>
      <p class="flow-text">Возможно когда-то Вы задумывались о динамической обложки для своей группы, но узнав о существующих решениях поняли, что это слишком сложно и не стоит того.</p>
      <p class="flow-text">Спешим Вас обрадовать! Donatelo поможет вам без особого труда и затрат самостоятельно создать динамическую обложку для своей группы или паблика.</p>
      <a target="_blank" :href="'https://vk.com/add_community_app.php?aid=' + $parent.api.api_id" class="btn vk-color">Подключить приложение</a>
    </div>
    <br>
    <br>
    <img class="responsive-img" src="assets/screen1.png">
    <div class="info container center">
      <h1 class="label">Виджеты</h1>
      <p class="flow-text">Donatelo обладает множеством виджетов для реализации вашего собственного дизайна обложки!</p>
      <p class="flow-text">Все что вам нужно - это расставлять различные элементы на вашу обложку и изменять стилистику! Попробуйте сами:</p>
      <a target="_blank" :href="'https://vk.com/add_community_app.php?aid=' + $parent.api.api_id" class="btn vk-color">Подключить приложение</a>
    </div>
    <br>
    <br>
    <img class="responsive-img" src="assets/screen2.png">
    <div class="info container center">
      <h1 class="label">Сервисы</h1>
      <p class="flow-text">Donatelo предоставляет полноценный доступ к созданию своих собственных сервисов для разработчик, что позволяет делать свои собственные обложки при максимальной кастомности и разнообразности функционала!</p>
      <p class="flow-text">Вам, как пользователю приложения предоставляется постоянно пополняемый список виджетов и сервисов, однако это ни капли не усложняет работу!</p>
      <a target="_blank" :href="'https://vk.com/add_community_app.php?aid=' + $parent.api.api_id" class="btn vk-color">Подключить приложение</a>
    </div>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 10%;
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
