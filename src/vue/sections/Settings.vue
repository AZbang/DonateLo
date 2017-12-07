<template>
  <div class="settings">
    <p class="text">Изменить токен:</p>

    <el-row :gutter="20">
      <el-col :span="20">
        <el-input :value="token" placeholder="Введите токен своей группы, как это сделать показано ниже" suffix-icon="el-icon-edit"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="updateToken">Изменить токен</el-button>
      </el-col>
    </el-row>

    <div class="container">
      <img class="responsive-img" src="assets/token.png" alt="token">
    </div>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        token: ''
      }
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
