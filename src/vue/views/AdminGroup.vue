<template>
  <div class="admin">
    <cover-control class="admin__cover"></cover-control>
    <div class="admin__menu">
      <el-menu :default-active="'WIDGETS'" class="el-menu-demo" mode="horizontal" @select="setControl">
        <el-menu-item index="WIDGETS">Виджеты</el-menu-item>
        <el-menu-item index="SERVICES">Сервисы</el-menu-item>
        <el-menu-item index="SETTINGS">Настройки</el-menu-item>
      </el-menu>
    </div>
    <div class="admin__section" :is="viewSection"></div>
  </div>
</template>

<script>
  const CoverControl = require('../components/CoverControl.vue');

  module.exports = {
    components: {
      CoverControl
    },
    computed: {
      viewSection() {
        return this.$store.state.views.currentSection;
      }
    },
    methods: {
      setControl(view) {
        this.$store.commit('setSection', view);
      },
    },
    mounted() {
      this.$store.commit('initRender', 'playground');
      this.$store.dispatch('callApi', {method: 'getGroup'});

      setInterval(() => {
        this.$store.dispatch('callApi', {method: 'loadVaribles', silent: true});
      }, 1000);
    }
  }
</script>
