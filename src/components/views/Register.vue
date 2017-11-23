<template>
  <div class="wrap">
    <div class="container">
      <img class="responsive-img" src="assets/token.png" alt="token">
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
        token: ""
      }
    },
    methods: {
      async submitToken(e) {
        VK.External.resizeWindow(920, 600);

        this.$emit('isLoad', true);
        let resp = await axios.post('https://app-donatelo.herokuapp.com/create_group', {
          app_id: this.api.api_id,
          auth_token: this.api.auth_key,
          access_token: this.token,
          group_id: this.api.group_id,
          viewer_id: this.api.viewer_id
        });
        this.$emit('isLoad', false);
        if(resp.data.code == 'ok')
          this.$emit('setView', 'admin');
        else {
          this.token = '';
          Materialize.toast('Ошибка! Пожалуйста, проверьте Ваш токен.');
        }
      }
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
    padding-top: 30%;
  }
  p {
    color: #5e81a8;
  }
</style>
