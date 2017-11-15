<template>
  <div class="wrap">
    <div class="row">
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
  .wrap {
    position: absolute;
    width: 100vw;
    left: 0;
    top: 0;
    height: 100vh;
    background: #fff;
  }
  .row {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    margin-left: -300px;
    margin-top: -150px;
  }
  p {
    color: #5e81a8;
  }
</style>
