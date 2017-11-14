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
    <div :is="viewComponent" @isLoad="setLoad"></div>
  </div>
</template>

<script>
  const AdminEditor = require('./views/AdminEditor.vue');
  const GettingStarted = require('./views/GettingStarted.vue');

  module.exports = {
    data() {
      return {
        api: {},
        isLoad: false
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
      setLoad(v) {
        this.isLoad = v;
      }
    },
    computed: {
      viewComponent() {
        this.getVKApiData();

        if(+this.api.viewer_type > 2 && this.api.group_id != null) return AdminEditor;
        else return GettingStarted;
      }
    }
  }
</script>

<style lang="css">
  body {
    overflow-x: hidden;
    background-color: #edeef0;
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
