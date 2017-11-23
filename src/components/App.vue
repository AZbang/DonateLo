<template>
  <div>
    <div class="preload" v-show="isLoad">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
    <div :is="viewComponent" :api="api" @setView="setView" @isLoad="setLoad"></div>
  </div>
</template>

<script>
  const axios = require('axios');
  const VIEWS = {
    'admin': require('./views/AdminEditor.vue'),
    'getting_started': require('./views/GettingStarted.vue'),
    'register': require('./views/Register.vue')
  }

  module.exports = {
    data() {
      return {
        api: {},
        viewComponent: null,
        isLoad: false,
        isExist: true
      }
    },
    methods: {
      getVKApiData() {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        let api = {};

        for(let i = 0; i < vars.length; i++) {
          let pair = vars[i].split("=");
          api[pair[0]] = pair[1];
        }
        api.api_result = JSON.parse(decodeURIComponent(api.api_result));
        this.api = api;
      },
      async isExistGroup() {
        let resp = await axios.post('https://app-donatelo.herokuapp.com/group_exist', {
          app_id: this.api.api_id,
          auth_token: this.api.auth_key,
          group_id: this.api.group_id,
          viewer_id: this.api.viewer_id
        });
        return resp.data.result;
      },
      setLoad(v) {
        this.isLoad = v;
      },
      setView(name) {
        this.viewComponent = VIEWS[name];
      }
    },
    async mounted() {
      this.getVKApiData();
      this.setLoad(true);
      this.isExist = await this.isExistGroup();

      if(+this.api.viewer_type > 2 && this.api.group_id != null) {
        if(this.isExist) this.setView('admin');
        else this.setView('register');
      } else this.setView('getting_started');

      this.setLoad(false);
    }
  }
</script>

<style lang="css">
  ::-webkit-scrollbar-track {
  	border-radius: 10px;
  	background-color: #edeef0;
  }
  ::-webkit-scrollbar {
  	width: 8px;
  	background-color: #edeef0;
  }
  ::-webkit-scrollbar-thumb {
  	background-color: #6e7cac;
  }

  body {
    overflow-x: hidden;
    background-color: #fff;
    width: 100vw;
    height: 100vh;
  }

  .preload {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 10000000;
    width: 100vw;
    height: 100vh;
  }

  .preloader-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -32px;
    margin-left: -32px;
  }

  .vk-color {
    box-shadow: none;
    background: #5e81a8 !important;
  }
  .label {
    font-weight: 300;
    margin-top: 10px;
  }
</style>
