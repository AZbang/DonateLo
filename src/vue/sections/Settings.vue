<template>
  <div class="container settings">
    <el-button class="settings-editor__main-btn" type="primary" @click="updateToken">Изменить токен</el-button>

    <p class="settings__main-text text">Изменить токен:</p>
    <el-input v-model="token" placeholder="Введите токен своей группы, как это сделать показано ниже" suffix-icon="el-icon-edit"></el-input>

    <div class="container">
      <img class="responsive-img" src="dist/assets/token.png" alt="token">
    </div>
  </div>
</template>

<script>
  module.exports = {
    data: {
      token: ''
    },
    methods: {
      updateToken() {
        this.$store.dispatch('callApi', {method: 'editToken', token: this.token});
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
