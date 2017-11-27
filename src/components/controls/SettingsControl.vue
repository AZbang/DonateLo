<template>
  <div class="editor-wrap">
    <a @click="updateToken" class="fixed-btns btn-floating btn-large waves-effect waves-light">
      <i class="material-icons">done</i>
    </a>
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
        this.$emit('updateToken', this.token);
      }
    }
  }
</script>

<style scoped>
a.fixed-btns {
  position: fixed;
  bottom: 20px;
  z-index: 100000;
  right: 20px;
  width: 60px;
  background: #6e7bab;
  height: 60px;
}
a.fixed-btns i {
  line-height: 62px;
  font-size: 35px;
}
</style>
