<template>
  <div class="editor-wrap">
    <slot @click="updateToken"></slot>
    <editor-forms>
      <div class="input-field col s12">
        <p class="flow-text">Изменить токен:</p>
        <div class="input-wrap">
          <input placeholder="Введите токен своей группы, как это сделать показано ниже" class="input browser-default" v-model="token">
        </div>
      </div>
      <div class="container">
        <img class="responsive-img" src="dist/assets/token.png" alt="token">
      </div>
    </editor-forms>
  </div>
</template>

<script>
  const EditorForms = require('../helpers/EditorForms.vue');

  module.exports = {
    components: {
      EditorForms
    },
    data: {
      token: ''
    },
    methods: {
      updateToken() {
        this.$emit('updateToken', token);
      }
    }
  }
</script>

<style scoped>
</style>
