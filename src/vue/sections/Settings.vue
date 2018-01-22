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
        this.$store.dispatch('editToken', this.token);
      }
    }
  }
</script>
