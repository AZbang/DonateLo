<template>
  <div class="container">
    <h1 class="label">Что такое Donatelo?</h1>
    <a :href="'https://vk.com/add_community_app.php?aid=' + api.api_id" class="btn vk-color">Подключить приложение</a>
    <p class="flow-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
</style>
