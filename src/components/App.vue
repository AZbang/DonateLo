<template>
  <div id="app">
    <transition name="slide">
      <router-view :api="api"></router-view>
    </transition>
  </div>
</template>

<script>
  module.exports = {
    data() {
      return {
        api: {}
      }
    },
    methods: {
      getApiData() {
       let query = window.location.search.substring(1);
       let vars = query.split("&");
       let api = {};

       for(let i = 0; i < vars.length; i++) {
         let pair = vars[i].split("=");
         api[pair[0]] = pair[1];
       }
       return api;
      }
    },
    mounted() {
      this.api = this.getApiData();
      this.api.api_result = JSON.parse(decodeURIComponent(this.api.api_result));

      if(+this.api.viewer_type > 2 && this.api.group_id != null) this.$router.push('/admin');
      else this.$router.push('/getting_started');
    }
  }
</script>

<style>
  .vk-color {
    box-shadow: none;
    background: #5e81a8 !important;
  }
  .label {
    font-weight: 300;
    margin-top: 10px;
  }


  .slide-leave-active,
  .slide-enter-active {
    transition: .4s;
  }
  .slide-enter {
    transform: translate(100%, 0);
  }
  .slide-leave-to {
    transform: translate(-100%, 0);
  }
</style>
