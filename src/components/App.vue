<template>
  <div :is="viewComponent"></div>
</template>

<script>
  const AdminEditor = require('./views/AdminEditor.vue');
  const GettingStarted = require('./views/GettingStarted.vue');

  module.exports = {
    data: {
      api: {}
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

  .vk-color {
    box-shadow: none;
    background: #5e81a8 !important;
  }
  .label {
    font-weight: 300;
    margin-top: 10px;
  }
</style>
