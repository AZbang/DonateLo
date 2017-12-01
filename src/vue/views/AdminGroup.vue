<template>
  <div id="admin">
    <cover-control></cover-control>
    <div class="admin__menu">
      <el-menu :default-active="'WIDGETS'" class="el-menu-demo" mode="horizontal" @select="setControl">
        <el-menu-item index="WIDGETS">Виджеты</el-menu-item>
        <el-menu-item index="SERVICES">Сервисы</el-menu-item>
        <el-menu-item index="SETTINGS">Настройки</el-menu-item>
      </el-menu>
      <el-button class="admin__menu-btn-cover-save" type="primary">Сохранить обложку</el-button>
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
        return this.$store.state.currentSection;
      }
    },
    methods: {
      setControl(view) {
        this.$store.commit('setSection', view);
      },
    },
    mounted() {
      VK.External.resizeWindow(1000, Math.max(660, window.screen.availHeight-200));
      this.$store.commit('initRender', 'playground');
    }
  }
</script>
