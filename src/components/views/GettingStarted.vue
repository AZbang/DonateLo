<template>
  <div id="getting-started">
    <img class="responsive-img" src="dist/assets/banner.png">
    <div class="getting-started__container">
      <h1 class="getting-started__label">Что такое Donatelo?</h1>
      <p class="getting-started__description">Возможно, Вы когда-нибудь задумывались о динамической обложке для своей группы, но узнав о существующих решениях поняли, что это слишком сложно и дорого.</p>
      <p class="getting-started__description">Спешим Вас обрадовать! Donatelo поможет вам без особого труда и затрат самостоятельно создать динамическую обложку для вашей группы или паблика.</p>
      <a target="_blank" :href="addAppLink">
        <el-button type="primary">Подключить приложение</el-button>
      </a>
    </div>
    <img class="responsive-img" src="dist/assets/screen1.png">
    <div class="getting-started__container">
      <h1 class="getting-started__label">Виджеты</h1>
      <p class="getting-started__description">Donatelo обладает множеством виджетов для реализации вашего собственного дизайна обложки! </p>
      <p class="getting-started__description">Все что вам нужно - это расставлять различные визуальные элементы на вашу обложку и изменять стилистику. </p>
      <a target="_blank" :href="addAppLink">
        <el-button type="primary">Подключить приложение</el-button>
      </a>
    </div>
    <img class="responsive-img" src="dist/assets/screen2.png">
    <div class="getting-started__container">
      <h1 class="getting-started__label">Сервисы</h1>
      <p class="getting-started__description">Donatelo уже имеет множество различных интеграций с существующими сервисами: Последний подписчик, глосования, стастистика по сборам и многое другое. Сервисы легко подключаются в меню приложения и способны отображать необходимую информацию на обложке группы.</p>
      <p class="getting-started__description">Если вам не хватает существующих сервисов, то специально для разработчиков Donatelo предоставляет API для интеграции ваших сервисов с нешей платформой, например вы можете интегрировать показ актуальных новостей с вашего сайта, специальные промо акции, все ограничивается лишь вашей фантазией! </p>
      <a target="_blank" :href="addAppLink">
        <el-button type="primary">Подключить приложение</el-button>
      </a>
    </div>
  </div>
</template>

<script>
  module.exports = {
    computed: {
      addAppLink() {
        return 'https://vk.com/add_community_app.php?aid=' + this.$store.state.api.api_id;
      }
    },
    mounted() {
      VK.External.resizeWindow(840, 3000);
    }
  }
</script>
