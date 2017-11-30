<template>
  <div class="wrap">
    <div class="container">
      <img class="responsive-img" src="dist/assets/token.png" alt="token">
      <p class="flow-text">Введите API токен вашей группы:</p>
      <div class="input-field col s12">
        <input id="token" type="text" v-model="token" @keyup.enter="submitToken">
        <label for="token">API токен</label>
      </div>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');

  module.exports = {
    props: ['api'],
    data() {
      return {
        token: ''
      }
    },
    methods: {
      submitToken(e) {
        this.$store.dispatch('callApi', 'createGroup', this.token);
      }
    },
    mounted() {
      VK.External.resizeWindow(1000, 600);
    }
  }
</script>

<style scoped>
  input {
    margin-top: 15px;
    border-bottom: 2px solid #5e81a8 !important;
  }
  .input-field input[type=text]:focus + label {
    color: #5e81a8;
  }
  .input-field input[type=text]:focus {
    border-bottom: 1px solid #5e81a8;
    box-shadow: 0 1px 0 0 #5e81a8;
  }
  label {
    left: 0rem;
  }
  .wrap {
    padding-top: 100px;
  }
  p {
    color: #5e81a8;
  }
</style>
