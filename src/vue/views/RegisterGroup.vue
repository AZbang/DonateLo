<template>
  <div id="register-group">
    <div class="container">
      <img class="responsive-img" src="assets/views/token.png" alt="token">
      <p class="text">Введите API токен вашей группы:</p>
      <el-input @change="submitToken" placeholder="Ваш токен" suffix-icon="el-icon-edit" v-model="token"></el-input>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: ['api'],
    data() {
      return {
        token: ''
      }
    },
    methods: {
      submitToken(e) {
        this.$store.dispatch('createGroup', this.token);
      }
    }
  }
</script>
